const Resort = require('../models/resort')

function index (req, res) {
  res.render('resorts/index', { title: 'Resorts-Page' })
}

function newResort (req, res) {
  res.render('resorts/new', { title: 'Add-Resort' })
  console.log('inside newResort')
}

function create (req, res) {
  console.log(req.body)
  let skiMountain = Resort.create({
    resortName: req.body.resortName,
    location: req.body.location,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    passUsed: req.body.passUsed,
    budget: req.body.budget,
    website: req.body.website,
    transportation: req.body.transportation,
    airport: req.body.airport,
    reviews: [
      {
        content: req.body.review,
        rating: req.body.rating,
        user: req.user.id,
        userName: req.user.name,
        userAvatar: req.user.avatar
      }
    ]
  })
  //   if (req.body.review) {
  //     Resort.findById(req.params.id)
  //     item.reviews.push(req.body.review)
  //   }

  res.redirect('/resorts')
}

module.exports = {
  index,
  new: newResort,
  create
}
