var express = require('express')
var router = express.Router()
var resortsCtrl = require('../controllers/resorts')

/* GET resorts list. */
router.get('/', resortsCtrl.index)

//GET page to ag new resort (right now this also includes a review)
router.get('/new', resortsCtrl.new)

router.get('/:id', resortsCtrl.show)

//POST the results of the input to the database
router.post('/new/add', resortsCtrl.create)

module.exports = router
