var express = require('express')
var router = express.Router()
var reviewsCtrl = require('../controllers/reviews')
const isLoggedIn = require('../config/auth')

/* GET resorts list. */
router.post('/:id/addReview', reviewsCtrl.create)

// router.get('/new', resortsCtrl.new)
//   res.render('resorts/new', { title: 'Resorts-Page' })
// })

module.exports = router
