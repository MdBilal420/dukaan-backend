import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./api/routes/products.js";
import cartRouter from "./api/routes/cart.js"
import wishlistRouter from "./api/routes/wishlist.js"

const app = express();
const PORT = process.env.PORT || 5000;


mongoose.connect('mongodb+srv://dukandaar:dukandaar@dukaanproducts.bsubo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
const db = mongoose.connection;
db.on("error", err => {
    console.log("failed")
})

db.on("connected", connected => {
    console.log("success")
})

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())
app.use("/products", productRouter)
app.use("/cart", cartRouter)
app.use("/wishlist", wishlistRouter)


app.use((req, res, next) => {
    res.status(404).json({ error: "invalid url" })
})


app.listen(PORT, () => { console.log(`running on port:${PORT}`) })