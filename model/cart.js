import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel" },
    quantity: { type: Number, default: 1 },
})

const CartModel = mongoose.model('CartModel', cartSchema);

export default CartModel;