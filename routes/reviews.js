var express = require('express')
var router = express.Router()
var reviewsCtrl = require('../controllers/reviews')
const isLoggedIn = require('../config/auth')

/* GET resorts list. */
router.post('/:id/addReview', reviewsCtrl.create)

router.delete('/:id', reviewsCtrl.delete)

module.exports = router
