var express = require('express')
var router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Ski-Planer' })
})

//Google OAuth login route
router.get(
  '/auth/google',
  passport.authenticate(
    //passport.authenticate returns a middleware function which coordinatres with Google's Oauth server
    'google', //specify that we want passport to use Google Strategy
    { scope: ['profile', 'email'], prompt: 'select_account' }
  )
) //user will be presented the consent screen if they have not previously consented

// Google OAuth callback route
router.get(
  // Google will call after the user confirms
  '/auth/google/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/', //might have to put /ski here if not working (TAKE OUT LATER)
    failureRedirect: '/'
  })
)

// OAuth logout route
router.get('/logout', function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err)
    } //logout method automatically added to req object by Passport
    res.redirect('/')
  })
})

module.exports = router
