const express = require('express')
const router = express.Router()
const authorCtrl = require('../controllers/authors')

// Index
router.get('/', authorCtrl.index)
// New
router.get('/new', authorCtrl.newFunc)
// SignIn
router.get('/sign-in', authorCtrl.showSignIn)
// Delete
router.delete('/:id', authorCtrl.destroy)
// Update
router.put('/:id', authorCtrl.update)
// Create
router.post('/', authorCtrl.signUp)
// Sign In Functionality
router.post('/sign-in-author', authorCtrl.signIn)
// Edit
router.get('/:id/edit', authorCtrl.edit)
// Show
router.get('/:id', authorCtrl.show)

module.exports = router