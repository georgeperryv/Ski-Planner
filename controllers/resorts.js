const Resort = require('../models/resort')
let allReviews = []

function index (req, res) {
  Resort.find({}, function (err, resortList) {
    res.render('resorts/index', { title: 'All Resorts', resortList })
  })
}

function newResort (req, res) {
  let todayDate = new Date() //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript#:~:text=Use%20new%20Date()%20to,the%20current%20date%20and%20time.&text=This%20will%20give%20you%20today's,to%20whatever%20format%20you%20wish.
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, '-')
  console.log('this is todays date', todayDate)
  res.render('resorts/new', { title: 'Add-Resort', todayDate })
}

function create (req, res) {
  console.log('im inside create and this is the allReviews Array', allReviews)
  console.log('1) im in side create')

  let stringStartDate = String(req.body.startDate)
  let stringEndDate = String(req.body.endDate)

  //   const hasReview = req.body.review
  let skiMountain = Resort.create({
    user: req.user.id,
    userName: req.user.name,
    userAvatar: req.user.avatar,
    resortName: req.body.resortName,
    location: req.body.location,
    startDate: stringStartDate,
    endDate: stringEndDate,
    passUsed: req.body.passUsed,
    budget: req.body.budget,
    website: req.body.website,
    transportation: req.body.transportation,
    airport: req.body.airport
  })
    .then(function (result) {
      console.log('1) the first result', result)
      Resort.findOne({ resortName: req.body.resortName }, function (
        err,
        existingResort
      ) {
        console.log('this is the existingResorts reviews', existingResort)
        allReviews = existingResort.reviews
        console.log('this is allREviews', allReviews)
        result.reviews = allReviews //should put all the reviews in the array
        console.log('this is the newest result', result)
        result.save()
        return result
      })
    })
    .then(function (result) {
      console.log('2) this is the result passed in', result)
      Resort.find({ resortName: req.body.resortName }, function (err, resort1) {
        // Add the user-centric info to req.body (the new review)
        console.log('this is resort1', resort1)
        resort1.forEach(element => {
          console.log('this is element', element)
          console.log('this is element._id', element.id)
          // console.log('this is result._id', resort1.id)
          element.reviews.push({
            content: String(req.body.review),
            rating: req.body.rating,
            user: req.user._id,
            userName: req.user.name,
            userAvatar: req.user.avatar
          })
          element.save(function (err) {})
        })
      })
    })

  res.redirect('/resorts')
}

function show (req, res) {
  Resort.findById(req.params.id, function (err, resort) {
    res.render('resorts/show', { title: 'Trip Details', resort })
    console.log('this is resort', resort)
    console.log('this is resort.website', resort.website)
  })
}

function displayField (req, res) {
  Resort.findById(req.params.id, function (err, resort) {
    const updateField = req.params.fieldChange
    res.render('resorts/update', { title: 'Update Page', resort, updateField })
  })
}

function update (req, res) {
  console.log('inside update method')
  Resort.findById(req.params.id, function (err, resort) {
    let updateField = req.params.fieldChange
    resort[updateField] = req.body[updateField]
    // console.log('this is resort.resortName', resort.resortName)
    // console.log('this is updateField', updateField)
    // console.log('this is resort.updateField', resort.updateField)
    // console.log('just req.body', req.body)
    // console.log('This is req.body.updateField', req.body.updateField)
    // console.log('This is resort', resort)
    Resort.create(resort) //I think what is happening here is when I craete a new document with the same exact ID as the other
    //(but different parameters depending on what was typed), it replaces the old because there can't be two with the same Id
    res.redirect(`/resorts/${resort._id}`)
  })
}

// function update (req, res) {
//   let updateField = req.params.fieldChange
//   let updateText = req.body[updateField]
//   console.log('this is updateField', updateField)
//   console.log('this is updateText', updateText)

//   Resort.findByIdAndUpdate(
//     req.params.id,
//     { updateField: updateText },
//     function (err, resort) {
//       console.log('this is the new resort', resort)
//     }
//   )
//   res.redirect(`/resorts/${resort._id}`)
// }

function deleteResort (req, res) {
  console.log('im in resort')
  Resort.findOne({ _id: req.params.id }).then(function (resort) {
    resort.remove()
    res.redirect('/resorts')

    //     const review = movie.reviews.id(req.params.id)
    //     if (!review.user.equals(req.user._id))
    //       return res.redirect(`/movies/${movie._id}`)
    //     review.remove()
    //     movie
    //       .save()
    //       .then(function () {
    //         res.redirect(`/movies/${movie._id}`)
    //       })
    //       .catch(function (error) {
    //         return next(error)
    //       })
  })
}

// let reviewsArray = Resort.findOne(
//     { resortName: req.body.resortName },
//     function (err, existingResort) {
//       allReviews.push(existingResort.reviews)
//       console.log('this is allReviews', allReviews)
//     }
//   )
//   await reviewsArray

module.exports = {
  index,
  new: newResort,
  create,
  show,
  displayField,
  update,
  delete: deleteResort
}
