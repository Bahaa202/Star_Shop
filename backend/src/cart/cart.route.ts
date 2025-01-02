import {Router} from 'express';
import cartService from "./cart.service";
import authService from "../auth/auth.service";

const cartRouter: Router = Router();

cartRouter.use(authService.protectedRoutes, authService.checkActive, authService.allowedTo('user'))

cartRouter.route('/')
    .get(cartService.getCart)
    .post(cartService.addToCart)
    .delete(cartService.clearCart);

cartRouter.route('/:itemId')
    .put(cartService.updateQuantity)
    .delete(cartService.removeFromCart);

cartRouter.put('/apply-coupon', cartService.applyCoupon);

export default cartRouter;