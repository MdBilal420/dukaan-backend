const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const { check, validationResult } = require('express-validator')

const User = require('../../model/user')
const SECRET = "this is a secret"


const tokenVerifier = (req, res, next) => {
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

router.get('/', tokenVerifier, (req, res) => {
    res.json({ name: "Bilal", age: 24, pincode: "225001" })
});



router.post("/",
    [
        check('email', 'Email is not valid').isEmail(),
        check('password', 'passowrd must have 6 characters').exists()
    ],
    async (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email })
            if (!user) {
                res.status(400).json({ message: "Invalid Credentials" })
            }

            const compare = await bcrypt.compare(password, user.password)
            if (!compare) {
                res.status(400).json({ message: "Invalid Credentials" })
            }

            const payload = { user: { id: user.id } }

            jwt.sign(payload, SECRET, (err, token) => {
                if (err) throw err
                res.send({ token })
            })
        } catch (error) {
            console.error(error.message)
            res.status(500).send('server error')
        }
    })

module.exports = router