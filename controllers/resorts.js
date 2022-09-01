const resort = require('../models/resort')
const Resort = require('../models/resort')

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
  //   const monthNames = [
  //     'January',
  //     'February',
  //     'March',
  //     'April',
  //     'May',
  //     'June',
  //     'July',
  //     'August',
  //     'September',
  //     'October',
  //     'November',
  //     'December'
  //   ]
  //   console.log('this is req.body.startDate', req.body.startDate)
  //   let startDateTotal = new Date(req.body.startDate) //date object
  //   console.log('the current month is ' + monthNames[startDateTotal.getMonth()])   could do this if you would rather have a full month
  let stringStartDate = String(req.body.startDate)
  //   let justStartDate = stringStartDateTotal.substring(0, 15)
  //   console.log('this is justStardDate', justStartDate)
  const hasReview = req.body.review
  let skiMountain = Resort.create({
    resortName: req.body.resortName,
    location: req.body.location,
    startDate: stringStartDate,
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
    console.log('this is resort.resortName', resort.resortName)
    console.log('this is updateField', updateField)
    console.log('this is resort.updateField', resort.updateField)
    console.log('just req.body', req.body)
    console.log('This is req.body.updateField', req.body.updateField)
    console.log('This is resort', resort)
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

module.exports = {
  index,
  new: newResort,
  create,
  show,
  displayField,
  update
}
