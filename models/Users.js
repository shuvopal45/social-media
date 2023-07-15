const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    profilePic: String,
    coverPic: String,
    profession: Array,
    study: Array,
    contact: Array,
    hobbies: Array,
    live: Array,
    relationship: String,
}, { timestamps: true })

const User = mongoose.model('User', userSchema)
module.exports = User 