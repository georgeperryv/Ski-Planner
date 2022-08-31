var express = require('express')
var router = express.Router()

/* GET resorts list. */
router.get('/', function (req, res, next) {
  res.render('resorts/index', { title: 'Resorts-Page' })
})

router.get('/new', function (req, res, next) {
    res.render('resorts/new', { title: 'Resorts-Page' })
  })

module.exports = router
