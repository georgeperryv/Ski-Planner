var express = require('express')
var router = express.Router()
const sourcesCtrl = require('../controllers/sources')

// GET resources page
router.get('/', sourcesCtrl.index)

module.exports = router
