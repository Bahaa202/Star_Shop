import {NextFunction, Request, Response} from "express";
import asyncHandler from "express-async-handler";
import usersSchema from "./users.schema";
import {Users} from "./users.interface";
import refactorService from "../refactor.service";
import ApiErrors from "../utils/apiErrors";
import {uploadSingleFile} from "../middlewares/uploadFiles.middleware";
import sharp from "sharp";
import bcrypt from "bcryptjs";
import sanitization from "../utils/sanitization";

class UsersService {
    getAll = refactorService.getAll<Users>(usersSchema, 'users');
    createOne = refactorService.createOne<Users>(usersSchema);
    getOne = refactorService.getOne<Users>(usersSchema, 'users');
    updateOne = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            image: req.body.image,
            active: req.body.active
        }, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({data: sanitization.User(user)});
    });
    deleteOne = refactorService.deleteOne<Users>(usersSchema);

    changePassword = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
        const user: Users | null = await usersSchema.findByIdAndUpdate(req.params.id, {
            password: await bcrypt.hash(req.body.password, 13),
            passwordChangedAt: Date.now(),
        }, {new: true});
        if (!user) return next(new ApiErrors(`${req.__('not_found')}`, 404));
        res.status(200).json({data: sanitization.User(user)});
    });

    uploadImage = uploadSingleFile(['image'], 'image');
    saveImage = async (req: Request, res: Response, next: NextFunction) => {
        if (req.file) {
            const fileName: string = `user-${Date.now()}-image.webp`;
            await sharp(req.file.buffer)
                .resize(1200, 1200)
                .webp({quality: 95})
                .toFile(`uploads/images/users/${fileName}`);
            req.body.image = fileName;
        }
        next();
    }
}

const usersService = new UsersService();
export default usersService;