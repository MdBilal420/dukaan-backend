const express = require("express");
const auth = require("../../Middleware/auth")

const router = express.Router()

const Cart = require("../../model/Cart");

//fetch data
router.get("/", auth, async (req, res) => {
  try {
    const cartData = await Cart.find({ user: req.user.id });
    res.status(200).json(cartData)
  }
  catch (error) {
    res.status(500).json({ success: true, message: error.message })
  }
})

//post data
router.post("/", auth, async (req, res) => {
  const { _id, name, image, price, brand, material, inStock, fastDelivery, ratings, color } = req.body;

  try {
    const cartItem = new Cart({
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
    const insertedItem = await cartItem.save()
    res.json(insertedItem)
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err })
  }
})

// delete data
router.delete("/:productId", auth, async (req, res) => {
  try {
    const product = req.params.productId
    if (!product) {
      res.status(404).json({ msg: "Item not found" })
    }
    await Cart.findByIdAndDelete(req.params.productId)
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})


// update cart



module.exports = router