const Resort = require('../models/resort')

function index (req, res) {
  Resort.find({}, function (err, resortList) {
    res.render('resorts/index', { title: 'All Resorts', resortList })
  })
}

function newResort (req, res) {
  res.render('resorts/new', { title: 'Add-Resort' })
  console.log('inside newResort')
}

function create (req, res) {
  const hasReview = req.body.review
  console.log(hasReview)
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
      //will need to find a way to make this happen only if there is a review written
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

function show (req, res) {
  Resort.findById(req.params.id, function (err, resort) {
    res.render('resorts/show', { title: 'Trip Details', resort })
  })
}

module.exports = {
  index,
  new: newResort,
  create,
  show
}
