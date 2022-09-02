var express = require('express')
var router = express.Router()
var resortsCtrl = require('../controllers/resorts')
const isLoggedIn = require('../config/auth')

/* GET resorts list. */
router.get('/', isLoggedIn, resortsCtrl.index)

//GET page to ag new resort (right now this also includes a review)
router.get('/new', isLoggedIn, resortsCtrl.new)

//GET detail/update page
router.get('/:id', isLoggedIn, resortsCtrl.show)

//GET the detail/update page with an update box for whatever was clicked
router.get('/:id/:fieldChange', isLoggedIn, resortsCtrl.displayField)

//POST all of the reviews to the reviews array of the new resort
router.post('/new/add', isLoggedIn, resortsCtrl.create)

//POST the results of the input to the database
// router.post('/new/add2', isLoggedIn, resortsCtrl.create)

//PUT (update the existing information) for a resort based on what a user types in
router.put('/:id/:fieldChange', isLoggedIn, resortsCtrl.update)

//DELETE
router.delete('/:id', resortsCtrl.delete)

module.exports = router
