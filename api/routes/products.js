const express = require("express");
const mongoose = require("mongoose");
const ProductModel = require("../../model/products.js");

const router = express.Router()

router.get("/", (req, res, next) => {
    ProductModel.find()
        .then(result => {
            res.status(200).json({ productData: result })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})

router.get("/:id", (req, res, next) => {
    ProductModel.findById(req.params.id)
        .then(result => {
            res.status(200).json({ productData: result })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err })
        })
})

router.post("/", (req, res, next) => {
    const product = new ProductModel({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        image: req.body.image,
        price: req.body.price,
        material: req.body.material,
        inStock: req.body.inStock,
        fastDelivery: req.body.fastDelivery,
        ratings: req.body.ratings,
        color: req.body.color
    })

    product.save()
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

module.exports = router
