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

// Always save the top-level document (not subdocs)

module.exports = {
  create
}
