const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const auth = require("../../Middleware/auth")
const SECRET = "this is a secret"


const { check, validationResult } = require('express-validator')

const User = require('../../model/User')


router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("server error")
    }
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