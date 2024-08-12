const Author = require('../models/author')
const bcrypt = require('bcrypt')



const signUp = async(req, res) => {
    try {
        const emailTaken = await Author.findOne({ email: req.body.email })
        if(emailTaken) return res.send('Email is taken')

        // Create User
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        req.body.password = hashedPassword
        await Author.create(req.body).then(() => res.redirect('/authors/sign-in'))
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const signIn = async(req, res) => {
    try {
        const authorExists = await Author.findOne({ email: req.body.email })
        if(!authorExists) throw new Error('Author Not Found')

        const validPassword = bcrypt.compareSync(req.body.password, authorExists.password)
        if(!validPassword) throw new Error('Login Failed')

        req.session.user = {
            email: authorExists.email,
            _id: authorExists._id
        }

        res.redirect('/posts')
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const index = async (req, res) => {
    try {
        const foundAuthors = await Author.find({})
        res.render('authors/index.ejs', {
            authors: foundAuthors
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const newFunc = (req, res) => {
  res.render('authors/new.ejs')
}
const showSignIn = (req, res) => {
    res.render('authors/signin.ejs')
  }

const destroy = async (req, res) => {
    try {
        const deletedAuthor = await Author.findOneAndDelete({ _id: req.params.id })
        deletedAuthor.posts.forEach((post) => {
            post.deleteOne()
        })
        deletedAuthor.comments.forEach((comment)=> {
            comment.deleteOne()
        })
        res.redirect('/authors')
        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const update = async (req, res) => {
    try {
        const updatedAuthor = await Author.findOneAndUpdate({ _id: req.params.id }, req.body, { new : true })
        res.redirect(`/authors/${updatedAuthor._id}`)        
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

// const create = async (req, res) => {
//     try {
//         const createdAuthor = await Author.create(req.body)
//         res.redirect(`/authors/${createdAuthor._id}`)
//     } catch (error) {
//         res.status(400).json({ msg: error.message })
//     }
// }

const edit = async (req, res) => {
    try {
        const foundAuthor = await Author.findOne({ _id: req.params.id })
        res.render('authors/edit.ejs', {
            author: foundAuthor
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

const show = async (req, res) => {
    try {
        const foundAuthor = await Author.findOne({ _id: req.params.id }).populate('posts comments')
        console.log(foundAuthor)
        res.render('authors/show.ejs', {
            author: foundAuthor
        })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

module.exports = {
    index,
    newFunc,
    destroy,
    update,
    signUp,
    signIn,
    showSignIn,
    edit,
    show
}