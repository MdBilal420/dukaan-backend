import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    image: String,
    price: Number,
    material: String,
    brand: String,
    inStock: Boolean,
    fastDelivery: Boolean,
    ratings: Number,
    color: String
})

const ProductModel = mongoose.model('ProductModel', productSchema);

export default ProductModel;

