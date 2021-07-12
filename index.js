const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const productRouter = require("./api/routes/products.js");
const cartRouter = require("./api/routes/cart.js");
const wishlistRouter = require("./api/routes/wishlist.js");
const signupRouter = require("./api/routes/signup.js")
const loginRouter = require("./api/routes/login")


const app = express();



mongoose.connect(
    'mongodb+srv://dukandaar:dukandaar@dukaanproducts.bsubo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
)
const db = mongoose.connection;
db.on("error", err => {
    console.log("failed")
})

db.on("connected", connected => {
    console.log("success")
})

app.use(cors())
app.use(express.json({ extended: true }))
app.use(express.urlencoded())
app.use("/signup", signupRouter)
app.use("/login", loginRouter)
app.use("/products", productRouter)
app.use("/cart", cartRouter)
app.use("/wishlist", wishlistRouter)


// app.use((req, res, next) => {
//     res.status(404).json({ error: "invalid url" })
// })

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => { console.log(`running on port:${PORT}`) })