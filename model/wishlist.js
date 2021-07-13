const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    wishlist: [
        {
            _id: String,
            name: String,
            image: String,
            price: Number,
            brand: String,
            material: String,
            inStock: Boolean,
            fastDelivery: Boolean,
            ratings: Number,
            color: String,
            quantity: {
                type: Number,
                default: 1
            }
        }
    ]
})

module.exports = mongoose.model('wishlist', wishlistSchema);;