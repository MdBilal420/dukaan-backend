const express = require("express");
const auth = require("../../Middleware/auth");

const router = express.Router()

const Wishlist = require("../../model/Wishlist");


router.get("/", auth, async (req, res) => {
    try {
        const wishlistData = await Wishlist.find({ user: req.user.id });
        res.status(200).json(wishlistData)
    }
    catch (error) {
        res.status(500).json({ success: true, message: error.message })
    }
})


//post data
router.post("/", auth, async (req, res) => {
    const { _id, name, image, price, brand, material, inStock, fastDelivery, ratings, color } = req.body;

    try {
        const wishlistItem = new Wishlist({
            user: req.user.id,
            _id,
            name,
            image,
            price,
            brand,
            material,
            inStock,
            fastDelivery,
            ratings,
            color
        })
        const item = await wishlistItem.save()
        res.json(item)
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err })
    }
})

//  delete

router.delete("/:productId", async (req, res) => {
    try {
        const product = req.params.productId
        if (!product) {
            res.status(404).json({ msg: "Item not found" })
        }
        await Wishlist.findByIdAndDelete(req.params.productId)
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})



module.exports = router