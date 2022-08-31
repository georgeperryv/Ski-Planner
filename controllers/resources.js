function index (req, res) {
  res.render('resources/index', { title: 'Resource-Page' })
  console.log('you did it!!!!')
}

module.exports = {
  index
}
