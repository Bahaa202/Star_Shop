import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import usersSchema from "../users/users.schema";
import ApiErrors from "../utils/apiErrors";
import createTokens from "../utils/tokens";
import sanitization from "../utils/sanitization";
import sendMail from "../utils/sendMail";

class AuthService {
    signup = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.create({
            username: req.body.username,
            password: req.body.password,
            name: req.body.name,
            email: req.body.email,
            image: req.body.image
        });
        const token = createTokens.accessToken(user._id, user.role);
        res.status(201).json({token, data: sanitization.User(user)});
    });
    login = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.findOne({$or: [{username: req.body.username}, {email: req.body.username}]});
        if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
            return next(new ApiErrors(`${req.__('invalid_login')}`, 400));
        const token = createTokens.accessToken(user._id, user.role);
        res.status(200).json({token, data: sanitization.User(user)});
    });
    adminLogin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user = await usersSchema.findOne({
            $or: [{username: req.body.username}, {email: req.body.username}],
            role: {$in: ['admin', 'employee']}
        });
        if (!user || user.hasPassword == false || !(await bcrypt.compare(req.body.password, user.password)))
            return next(new ApiErrors(`${req.__('invalid_login')}`, 400));
        const token = createTokens.accessToken(user._id, user.role);
        res.status(200).json({token, data: sanitization.User(user)});
    });
    protectedRoutes = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else return next(new ApiErrors(`${req.__('check_login')}`, 401));

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

        const user = await usersSchema.findById(decoded._id);
        if (!user) return next(new ApiErrors(`${req.__('check_login')}`, 401));

        if (user.passwordChangedAt instanceof Date) {
            const changedPasswordTime: number = Math.trunc(user.passwordChangedAt.getTime() / 1000);
            if (changedPasswordTime > decoded.iat) return next(new ApiErrors(`${req.__('check_password_changed')}`, 401));
        }

        req.user = user;
        next();
    })
    forgetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: any = await usersSchema.findOne({email: req.body.email});
        if (!user) return next(new ApiErrors(`${req.__('check_email')}`, 404));

        const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
        const cryptedCode = crypto.createHash('sha256').update(resetCode).digest('hex');
        const message = `Your reset code is: ${resetCode}`;
        const options = {
            message,
            email: user.email,
            subject: 'Reset password'
        }
        try {
            await sendMail(options);
            user.passwordResetCode = cryptedCode;
            user.passwordResetCodeExpires = Date.now() + (10 * 60 * 1000);
            user.passwordResetCodeVerify = false;
            if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
            await user.save({validateModifiedOnly: true});
        } catch (e) {
            console.log(e);
            return next(new ApiErrors(`${req.__('send_email')}`, 500));
        }
        const token = createTokens.resetToken(user._id);
        res.status(200).json({token, success: true});
    })
    verifyResetCode = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else return next(new ApiErrors(`${req.__('check_verify_code')}`, 403));

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_RESET!);
        const hashedResetCode: string = crypto.createHash('sha256').update(req.body.resetCode).digest('hex');
        const user: any = await usersSchema.findOne({
            _id: decoded._id,
            passwordResetCode: hashedResetCode,
            passwordResetCodeExpires: {$gt: Date.now()}
        });
        if (!user) return next(new ApiErrors(`${req.__('check_code_valid')}`, 403));

        user.passwordResetCodeVerify = true;
        if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
        await user.save({validateModifiedOnly: true});

        res.status(200).json({success: true});
    })
    resetPassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        let token: string = '';
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
            token = req.headers.authorization.split(' ')[1];
        else return next(new ApiErrors(`${req.__('check_reset_code')}`, 403));

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET_RESET!);
        const user: any = await usersSchema.findOne({
            _id: decoded._id,
            passwordResetCodeVerify: true,
        });
        if (!user) return next(new ApiErrors(`${req.__('check_code_verify')}`, 403));

        user.password = req.body.password;
        user.passwordResetCodeExpires = undefined;
        user.passwordResetCode = undefined;
        user.passwordResetCodeVerify = undefined;
        user.passwordChangedAt = Date.now();
        if (user.image && user.image.startsWith(`${process.env.BASE_URL}`)) user.image = user.image.split('/').pop();
        await user.save({validateModifiedOnly: true});

        res.status(200).json({success: true});
    })
    allowedTo = (...roles: string[]) =>
        asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
            if (!roles.includes(req.user.role)) return next(new ApiErrors(`${req.__('allowed_to')}`, 403));
            next();
        })
    checkActive = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        if (!req.user.active) return next(new ApiErrors(`${req.__('check_active')}`, 403));
        next();
    })
}

const authService = new AuthService();
export default authService;