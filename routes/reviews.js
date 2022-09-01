var express = require('express')
var router = express.Router()
var resortsCtrl = require('../controllers/resorts')

/* GET resorts list. */
router.get('/', resortsCtrl.index)

router.get('/new', resortsCtrl.new)
//   res.render('resorts/new', { title: 'Resorts-Page' })
// })

module.exports = router
