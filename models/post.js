const { model, Schema } = require('mongoose')


const postSchema = new Schema({
   title: { type: String, required: true, unique: true },
   content: String,
   author: { type: Schema.Types.ObjectId, required: true, ref: 'Author' },
   comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}]
})


const Post = model('Post', postSchema)

module.exports = Post