import mongoose from "mongoose";
import {Carts} from "./cart.interface";

const cartSchema = new mongoose.Schema<Carts>({
    items: [{
        product: {type: mongoose.Schema.Types.ObjectId, ref: 'products'},
        quantity: {type: Number, default: 1},
        price: Number
    }],
    taxPrice: Number,
    totalPrice: {type: Number},
    totalPriceAfterDiscount: {type: Number},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'}
}, {timestamps: true});

cartSchema.pre<Carts>(/^find/, function (next) {
    this.populate({path: 'items.product', select: 'name cover'})
    next();
});

export default mongoose.model<Carts>('carts', cartSchema);
