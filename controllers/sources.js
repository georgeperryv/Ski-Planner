function index (req, res) {
  res.render('sources/index', { title: 'Sources-Page' })
}

module.exports = {
  index
}
