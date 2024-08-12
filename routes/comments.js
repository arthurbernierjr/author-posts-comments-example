const express = require('express')
const router = express.Router()
const commentCtrl = require('../controllers/comments')


// Create
router.post('/addTo/:postId', commentCtrl.create)


module.exports = router