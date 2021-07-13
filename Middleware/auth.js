const express = require("express");
const jwt = require("jsonwebtoken")


const SECRET = "this is a secret"

const auth = (req, res, next) => {
    const token = req.headers.authorization
    try {
        const decoded = jwt.verify(token, SECRET)
        req.user = decoded.user
        return next()
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorised" })
    }
}

module.exports = auth