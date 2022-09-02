const Resort = require('../models/resort')

function create (req, res) {
  // Find the movie to embed the review within
  console.log('this is req.params.id', req.params.id)
  Resort.findById(req.params.id, function (err, targetResort) {
    resortName = targetResort.resortName
    console.log('resortName', resortName)
    Resort.find({ resortName: resortName }, function (err, resort) {
      // Add the user-centric info to req.body (the new review)
      console.log('all of the resorts with the name inputed', resort)

      req.body.user = req.user._id
      req.body.userName = req.user.name
      req.body.userAvatar = req.user.avatar

      // Push the subdoc for the review
      console.log('new review to be pushed', req.body)
      resort.forEach(element => {
        console.log('inside for Each', element.resortName)
        element.reviews.push(req.body)
        element.save(function (err) {})
      })
    })
  })
  res.redirect(`/resorts/${req.params.id}`)
}

function deleteReview (req, res, next) {
  Resort.findOne({ 'reviews._id': req.params.id }).then(function (resort) {
    const review = resort.reviews.id(req.params.id)
    if (!review.user.equals(req.user._id))
      return res.redirect(`/resorts/${resort._id}`)
    review.remove()
    resort
      .save()
      .then(function () {
        res.redirect(`/resorts/${resort._id}`)
      })
      .catch(function (error) {
        return next(error)
      })
  })
}

// Always save the top-level document (not subdocs)

module.exports = {
  create,
  delete: deleteReview
}
