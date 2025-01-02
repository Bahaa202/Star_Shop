import express from 'express';
import csurf from "csurf";
import categoriesRouter from "./categories/categories.route";
import subcategoriesRoute from "./subcategories/subcategories.route";
import globalErrors from "./middlewares/errors.middleware";
import ApiErrors from "./utils/apiErrors";
import productsRoute from './products/products.route';
import usersRoute from "./users/users.route";
import authRoute from "./auth/auth.route";
import profileRoute from "./profile/profile.route";
import googleRoute from "./google/google.Route";
import wishlistRoute from "./wishlist/wishlist.route";
import addressRoute from "./address/wishlist.route";
import reviewsRoute from "./reviews/reviews.route";
import couponsRoute from "./coupons/coupons.route";
import cartRoute from "./cart/cart.route";
import ordersRoute from "./orders/orders.route";
import verifyPaymob from "./middlewares/verifyPaymob.middleware";
import paymentRoute from "./orders/payment.route";

declare module "express" {
    interface Request {
        filterData?: any;
        files?: any;
        user?: any;
    }
}

const mountRoutes = (app: express.Application) => {
    app.post('/paymob-webhook', verifyPaymob, (req: express.Request, res: express.Response, next: express.NextFunction) => {
        if (req.body.obj.success === true) {
            // res.redirect(307, `/api/v1/${req.body.obj.payment_key_claims.extra.routeName}`);
            res.redirect(307, `/api/v1/payment`);
        } else {
            return next(new ApiErrors('invalid payment', 403));
        }
    });
    app.use('/auth/google', googleRoute);
    app.use('/api/v1/payment', paymentRoute);
    app.use(
        csurf({
            cookie: {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            },
        }),
    );
    app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
        res.cookie('cookies', req.csrfToken());
        next();
    });
    app.use('/api/v1/categories', categoriesRouter);
    app.use('/api/v1/subcategories', subcategoriesRoute);
    app.use('/api/v1/products', productsRoute);
    app.use('/api/v1/auth', authRoute);
    app.use('/api/v1/users', usersRoute);
    app.use('/api/v1/profile', profileRoute);
    app.use('/api/v1/wishlist', wishlistRoute);
    app.use('/api/v1/address', addressRoute);
    app.use('/api/v1/reviews', reviewsRoute);
    app.use('/api/v1/coupons', couponsRoute);
    app.use('/api/v1/cart', cartRoute);
    app.use('/api/v1/orders', ordersRoute);
    app.all('*', (req: express.Request, res: express.Response, next: express.NextFunction) => {
        next(new ApiErrors(`route ${req.originalUrl} not found`, 400));
    });
    app.use(globalErrors);
}

export default mountRoutes;