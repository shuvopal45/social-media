const express = require('express')
const router = express.Router()
const User = require('../models/Users')
const bcrypt = require('bcrypt')
// const multer = require('multer')

// const UPLOAD_FOLDER = '../../src/uploads/'

// const storage = multer.diskStorage({
//     destination: (_req, _file, cb) => {
//         cb(null, UPLOAD_FOLDER)
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.fieldname + "-" + Date.now() + "-" + file.originalname
//         cb(null, fileName)
//     }
// })

// const upload = multer({
//     storage: storage
// }).single('image')

router.post('/register', async (req, res, next) => {
    try {
        const { username, pin, file } = req.body
        console.log(image)
        const findUser = await User.findOne({ username })
        const salt = await bcrypt.genSalt(11)
        const hashedPin = await bcrypt.hash(pin, salt)
        if (findUser) {
            return res.status(400).json('User already exist!')
        } else {
            const user = new User({
                username, password: hashedPin, profilePic: file
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

module.exports = router