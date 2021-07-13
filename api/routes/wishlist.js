const express = require("express");
const auth = require("../../Middleware/auth");
const _ = require('lodash');

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
    const present = await Wishlist.findOne({ user: req.user.id })
    try {
        if (present) {
            try {
                const wishlist = await Wishlist.findOneAndUpdate({ user: req.user.id }, {
                    "$push": {
                        wishlist: req.body.wishlistItems
                    }
                })
                return res.status(201).json({ wishlist, msg: "item added to wishlist" })
            } catch (error) {
                return res.status(400).json({ error, msg: "item cannot be added to the current wishlist" })
            }
        } else {
            const wishlist = new Wishlist({
                user: req.user.id,
                wishlist: [req.body.wishlistItems]
            })
            try {
                const newWishlist = await wishlist.save()
                return res.status(201).json({ wishlist: newWishlist.wishlist, msg: "new wishlist created" })
            } catch (error) {
                return res.status(400).json({ error, msg: "cannot create new wishlist" })
            }
        }
    } catch (error) {
        return res.status(400).json({ error })
    }
})

//  delete

router.delete("/:productId", auth, async (req, res) => {

    let wishlist = await Wishlist.findOne({ user: req.user.id })
    const product = req.params.productId


    wishlist = _.extend(wishlist,
        {
            wishlist: _.filter(wishlist.wishlist,
                (item) => item._id !== product)
        })

    try {

        await wishlist.save()
        res.status(200).json({ success: true, wishlist })

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})



module.exports = router