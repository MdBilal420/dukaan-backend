import express from "express";
import CartModel from "../../model/cart.js";


const router = express.Router()

router.get("/", (req, res, next) => {
  CartModel.find().populate('_id')
    .then(result => {
      res.status(200).json({ cartData: result })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })
})

router.get("/:id", (req, res, next) => {
  CartModel.findById(req.params.id).populate('_id')
    .then(result => {
      res.status(200).json({ productData: result })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })
})

router.post("/", (req, res, next) => {
  const product = req.body;
  const cart = new CartModel(product)
  cart.save()
    .then(result => {
      console.log(result);
      res.status(200).
        json({ newProduct: result })
    }).
    catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    })
})



export default router;