const Comment = require('../models/comment')
const Post = require('../models/post')
const Author = require('../models/author')

const create = async (req, res) => {
    try {
        req.body.author = req.session.user._id
        req.body.post = req.params.postId
        const comment = await Comment.create(req.body)
        const author = await Author.findOne({ _id: req.session.user._id })
        const post = await Post.findOne({ _id: req.params.postId })    
        post.comments.addToSet(comment)
        author.comments.addToSet(comment)
        await post.save()
        await comment.save()
        res.redirect(`/posts/${req.params.postId}`)
    
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}


module.exports = {
    create
}