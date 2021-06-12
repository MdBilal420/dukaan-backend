const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const { check, validationResult } = require('express-validator')

const User = require('../../model/User')

router.post("/",
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Email is not valid').isEmail(),
        check('password', 'passowrd must have 6 characters').isLength({ min: 6 })
    ],
    async (req, res) => {
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() })
        }

        try {
            const user = req.body;
            const { email } = req.body
            const found = await User.findOne({ email })
            if (found) {
                res.status(400).json({ message: "User already exist" })
            }
            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(user.password, salt)
            const NewUser = new User(user)

            await NewUser.save()

            const payload = { NewUser: { id: NewUser.id } }

            jwt.sign(payload, "secret", (err, token) => {
                if (err) throw err
                res.send({ token })
            })
        } catch (error) {
            console.error(error.message)
            res.status(500).send('server error')
        }
    })

module.exports = router