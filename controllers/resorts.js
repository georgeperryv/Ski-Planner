const Resort = require('../models/resort')

function index (req, res) {
  res.render('resorts/index', { title: 'Resorts-Page' })
}

function newResort (req, res) {
  res.render('resorts/new', { title: 'Add-Resort' })
  console.log('inside newResort')
}

module.exports = {
  index,
  new: newResort
}
