import express from "express";
import WishlistModel from "../../model/wishlist.js";


const router = express.Router()

router.get("/", async (req, res, next) => {
    await WishlistModel.find({}).populate("product")
        .then(result => {
            res.status(200).json({ wishlistData: result })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})


router.post("/", async (req, res) => {
    const product = req.body;
    const wishlist = new WishlistModel(product)
    const insertedItem = await wishlist.save()
    insertedItem.populate("product").execPopulate()
        .then(result => {
            res.status(200)
                .json({ wishlist: result })
        }).
        catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})

router.delete("/:productId", async (req, res) => {
    try {
        const productId = req.params.productId
        await WishlistModel.findOneAndDelete({ product: productId })
        res.status(200).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})

// router.get("/:id", (req, res, next) => {
//     wishlistModel.find().populate("_id")
//         .then(result => {
//             res.status(200).json({ wishlistData: result })
//         })
//         .catch(err => {
//             console.log(err);
//             res.status(500).json({ error: err })
//         })
// })

export default router;