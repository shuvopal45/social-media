require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const router = require('./routes/router')

const app = express()

const middleware = [
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),
    cors()
]

app.get('/', (req, res, next) => {
    res.json({
        message: 'This is server for API!'
    })
})

app.use(middleware)
app.use(router)

const PORT = process.env.PORT || 9090
mongoose.connect('mongodb+srv://shuvo:kwI0tkSMq6c9aUnY@cluster0.2pulu.mongodb.net/facebook', {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    if (mongoose.connection) {
        console.log('DATABASE CONNECTED!')
        app.listen(PORT, () => console.log(`SERVER IS RUNNING ON PORT ${PORT}`))
    }
}).catch((err) => {
    if (err) {
        console.log(err)
    }
})