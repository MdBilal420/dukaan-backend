import mongoose from "mongoose";
// import ProductModel from "../model/products.js";

const cartSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel" },
    quantity: { type: Number, default: 1 }
})

const CartModel = mongoose.model('CartModel', cartSchema);

export default CartModel;