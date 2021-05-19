import express from "express";
import CartModel from "../../model/cart.js";


const router = express.Router()


//fetch data
router.get("/", async (req, res, next) => {
  try {
    const cartData = await CartModel.find({}).populate("product");
    res.status(200).json({ cartData })
  }
  catch (error) {
    res.status(500).json({ success: true, message: error.message })
  }
})

//post data
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const present = await CartModel.exists({ product: product.product._id })
    if (present) {
      return res.status(409).json({ success: false, message: "Duplicate" })
    }
    const cart = new CartModel(product)
    const insertProduct = await cart.save()
    const populateProduct = await insertProduct.populate("product").execPopulate()
    res.json({ cart: populateProduct, success: true })
  }
  catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// delete data
router.delete("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId
    await CartModel.findOneAndDelete({ product: productId })
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

//update data

router.post("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId
    const product = await CartModel.findById(productId)
    const updatedData = req.body
    const updatedProduct = extend(product, updatedData)
    const newProduct = await updatedProduct.save()
    res.status(200).json({ newProduct, success: true })
  }
  catch (error) {
    res.status(500).json({ success: false, message: error })
  }
})


export default router;