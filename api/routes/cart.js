const express = require("express");
const auth = require("../../Middleware/auth")
const _ = require('lodash');

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
  const found = await Cart.findOne({ user: req.user.id })
  try {
    if (found) {
      try {
        const cart = await Cart.findOneAndUpdate({ user: req.user.id }, {
          "$push": {
            cartlist: req.body.cartItems
          }
        })
        return res.status(201).json({ cart, msg: "item added to cart" })
      } catch (error) {
        return res.status(400).json({ error, msg: "item cannot be added to the current cart" })
      }
    } else {
      const cart = new Cart({
        user: req.user.id,
        cartlist: [req.body.cartItems]
      })
      try {
        const newCart = await cart.save()
        return res.status(201).json({ cart: newCart.cartlist, msg: "new cart created" })
      } catch (error) {
        return res.status(400).json({ error, msg: "cannot create new cart" })
      }
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// delete data
router.delete("/:productId", auth, async (req, res) => {

  let cartlist = await Cart.findOne({ user: req.user.id })
  const product = req.params.productId


  cartlist = _.extend(cartlist,
    {
      cartlist: _.filter(cartlist.cartlist,
        (item) => item._id !== product)
    })

  try {

    await cartlist.save()
    res.status(200).json({ success: true, cartlist })

  } catch (error) {
    res.status(500).json({ success: false, message: error.message })
  }
})

// update

router.post("/inc", auth, async (req, res) => {
  const present = await Cart.findOne({ user: req.user.id })
  const p = req.body.cartItems
  const item = present.cartlist.find((it) => it._id === p._id)
  console.log(item)
  try {
    if (present) {
      const cartlist = await Cart.findOneAndUpdate({ user: req.user.id }, {
        "$set": {
          cartItems: {
            ...req.body.cartItems,
            quantity: item.quantity + 1
          }
        }
      })
      return res.status(201).json({ cartlist, msg: "item added to wishlist" })
    }
  } catch (error) {
    return res.status(400).json({ error })
  }
})

// update cart






//////////////prev
// router.post("/", auth, (req, res) => {
//   Cart.findOne({ user: req.user.id })
//     .exec((error, cart) => {
//       if (error) return res.status(400).json({ error })
//       if (cart) {
//         console.log(req)
//         Cart.findOneAndUpdate({ user: req.user.id }, {
//           "$push": {
//             "cartlist": req.body.cartItems
//           }
//         })
//           .exec((error, _cart) => {
//             if (error) return res.status(400).json({ error })
//             if (_cart) {
//               return res.status(201).json({ _cart })
//             }
//           })
//       }
//       else {
//         const cart = new Cart({
//           user: req.user.id,
//           cartlist: [req.body.cartItems]
//         })
//         cart.save((error, cart) => {
//           if (error) return res.status(400).json({ error })
//           if (cart) return res.status(201).json({ cart })
//         })
//       }
//     })
// })

module.exports = router