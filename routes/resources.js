var express = require('express')
var router = express.Router()
const resourcesCtrl = require('../controllers/resources')

// GET resources page
router.get('/', resourcesCtrl.index)

module.exports = router
