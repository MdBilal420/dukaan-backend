const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: "ProductModel" },
})

const WishlistModel = mongoose.model('WishlistModel', wishlistSchema);

module.exports = WishlistModel;