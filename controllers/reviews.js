const Resort = require('../models/resort')

function create (req, res) {
  // Find the movie to embed the review within
  Resort.findById(req.params.id, function (err, resort) {
    // Add the user-centric info to req.body (the new review)
    req.body.user = req.user._id
    req.body.userName = req.user.name
    req.body.userAvatar = req.user.avatar

    // Push the subdoc for the review
    resort.reviews.push(req.body)
    // Always save the top-level document (not subdocs)
    review.save(function (err) {
      res.redirect(`/resorts/${resort._id}`)
    })
  })
}

module.exports = {
  create
}
