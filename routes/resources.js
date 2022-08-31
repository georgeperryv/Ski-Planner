var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('resources/index', { title: 'Resource-Page' })
})

module.exports = router
