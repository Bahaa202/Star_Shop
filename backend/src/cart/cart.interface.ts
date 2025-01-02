import {Document, Schema} from "mongoose";
import {Users} from "../users/users.interface";
import {Products} from "../products/products.interface";

export interface Carts extends Document {
    items: CartItems[];
    taxPrice: number;
    totalPrice: number;
    totalPriceAfterDiscount: number | undefined;
    user: Users;
}

export interface CartItems {
    _id: Schema.Types.ObjectId;
    product: Products;
    quantity: number;
    price: number;
}