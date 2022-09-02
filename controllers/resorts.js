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
  res.render('resorts/new', { title: 'Add-Resort', todayDate }) //gives the new resort page the current date so it can be set as the min on the input field
}

function create (req, res) {
  //creates a new destination
  //the first part of this function (before the .then) creates a new Resort without any reviews, even if a review was entered on this page
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
      //once a new resort is created without a review, this .then fucntion will find one document with the same name as what was inputed,
      //get an array of all of the reviews associated with that resort, and add that array to the reviews of the new Resort we just created and passed into this .then
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
        result.save() // This saves a new Resort which includes all of the new fields entered plus an array of all previous reviews for that resortName attached to the review key value
        return result
      })
    })
    .then(function (result) {
      //Now all resorts with the same name should have all of the previous reviews. The below .then function adds the new review (if there is one) to all of the documents with the same resortName
      console.log('this is req.body.review', req.body.review)
      if (req.body.review) {
        console.log('2) this is the result passed in', result)
        Resort.find({ resortName: req.body.resortName }, function (
          err,
          resort1
        ) {
          console.log('this is resort1', resort1)
          resort1.forEach(element => {
            //element will represent every document where that resortName matches the resortName of the document being created
            console.log('this is element', element)
            console.log('this is element._id', element.id)
            element.reviews.push({
              //We will push a new review (the one being eneter right now) to every element where the names match
              content: String(req.body.review),
              rating: req.body.rating,
              user: req.user._id,
              userName: req.user.name,
              userAvatar: req.user.avatar
            })
            element.save(function (err) {})
          })
        })
      }
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
  let todayDate = new Date() //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript#:~:text=Use%20new%20Date()%20to,the%20current%20date%20and%20time.&text=This%20will%20give%20you%20today's,to%20whatever%20format%20you%20wish.
    .toJSON()
    .slice(0, 10)
    .replace(/-/g, '-')
  Resort.findById(req.params.id, function (err, resort) {
    const updateField = req.params.fieldChange
    res.render('resorts/update', {
      title: 'Update Page',
      resort,
      updateField,
      todayDate
    })
  })
}

function update (req, res) {
  console.log('inside update method')
  Resort.findById(req.params.id, function (err, resort) {
    let updateField = req.params.fieldChange
    resort[updateField] = req.body[updateField]
    Resort.create(resort) //I think what is happening here is when I craete a new document with the same exact ID as the other
    //(but different parameters depending on what was typed), it replaces the old because there can't be two with the same Id
    res.redirect(`/resorts/${resort._id}`)
  })
}

function deleteResort (req, res) {
  console.log('im in resort')
  Resort.findOne({ _id: req.params.id }).then(function (resort) {
    resort.remove()
    res.redirect('/resorts')
  })
}

module.exports = {
  index,
  new: newResort,
  create,
  show,
  displayField,
  update,
  delete: deleteResort
}
