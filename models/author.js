const Post = require('./post')
const Comment = require('./comment')
const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true},
    name: { type: String, required: true },
    password: { type: String, required: true },
    posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
})

const Author = mongoose.model('Author', authorSchema)

module.exports = Author