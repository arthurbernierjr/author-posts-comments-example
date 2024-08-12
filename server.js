require('dotenv').config()
const express = require('express')
const app = express()
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const MONGO_URI = process.env.MONGO_URI
const authorRouter = require('./routes/authors')
const postRouter = require('./routes/posts')
const commentRouter = require('./routes/comments')
const session = require('express-session')

mongoose.connect(MONGO_URI)

mongoose.connection.once('open', () => {
    console.log('You did it I am connected to Mongo')
})

mongoose.connection.on('error', () => {
    console.log('Dont get mad but you have an error')
})


app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  res.locals.data = {}
  next()
})
app.use(methodOverride('_method'))
app.use(
    session({
        secret: 'process session secret should go here update your .env accordingly',
        resave: false,
        saveUninitialized: true
    })
)
app.use('/assets', express.static('public'))

app.use('/authors', authorRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

app.listen(3000, () => {
    console.log('Running the app on 3000')
})