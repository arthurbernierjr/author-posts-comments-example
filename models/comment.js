const {model, Schema} = require('mongoose')

const commentSchema = new Schema ({
    author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
    content: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
}, {
    timestamps: true
})

const Comment = model('Comment', commentSchema)

module.exports = Comment