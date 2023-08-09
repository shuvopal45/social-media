const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const bcrypt = require('bcrypt')

router.post('/register', async (req, res, next) => {
    try {
        const { username, pin, profileImage } = req.body
        const findUser = await User.findOne({ username })
        const salt = await bcrypt.genSalt(11)
        const hashedPin = await bcrypt.hash(pin, salt)
        if (findUser) {
            return res.status(400).json('User already exist!')
        } else {
            const user = new User({
                username, password: hashedPin, profilePic: profileImage
            })
            const saveUser = await user.save()
            if (saveUser) {
                return res.status(200).json('Account created successfully!')
            } else {
                return res.status(400).json('Something happened wrong!')
            }
        }
        
    } catch (err) {
        console.log(err)
    }
})
router.post('/login', async (req, res, next) => {
    try {
        const { username, pin } = req.body
        const findUser = await User.findOne({ username })
        if (!findUser) {
            return res.status(400).json("This user not found!")
        } else {
            const match = await bcrypt.compare(pin, findUser.password)
            if (!match) {
                return res.status(400).json("Incorrect Pin!")
            } else {
                return res.status(200).json("Login Successfull!")
            }
        }
    } catch(err) {
        console.log(err)
    }
})

module.exports = router