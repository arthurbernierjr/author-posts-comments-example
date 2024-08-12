const express = require('express')
const router = express.Router()
const postCtrl = require('../controllers/posts')

// Index
router.get('/', postCtrl.index)
// New
router.get('/new', postCtrl.newFunc)
// Delete
router.delete('/:id', postCtrl.destroy)
// Update
router.put('/:id', postCtrl.update)
// Create
router.post('/', postCtrl.create)
// Edit
router.get('/:id/edit', postCtrl.edit)
// Show
router.get('/:id', postCtrl.show)

module.exports = router