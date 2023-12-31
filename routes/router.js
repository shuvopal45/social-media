const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const checkLogin = require('../middleware/checkLogin')

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
                const token = jwt.sign({
                    username: findUser.username,
                    userId: findUser._id
                }, 'ahsdgashgdjsaghasygfashgfasjkhgfksgfasfgsafgasjgasjhgasjfga76tuy', {
                    expiresIn: '7d'
                })
                return res.status(200).json({
                    token: token,
                    message: "Login Successfull!"
                })
            }
        }
    } catch(err) {
        console.log(err)
    }
})

router.get('/user', checkLogin, async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.userId })
        return res.status(200).json(user)
    } catch(err) {
        console.log(err)
    }
})

module.exports = router