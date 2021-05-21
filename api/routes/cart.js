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
  const product = req.body;
  const cartItem = new CartModel(product)
  cartItem.save()
    .then(item => res.json({ item })
      .populate("product").execPopulate())
    .then(result => {
      res.status(200).
        json({ newProduct: result })
    }).
    catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })
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

export default router;