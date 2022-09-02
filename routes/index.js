var express = require('express')
var router = express.Router()
const passport = require('passport')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Ski-Planer' })
})

router.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    prompt: 'select_account'
  })
)

router.get(
  '/auth/google/oauth2callback',
  passport.authenticate('google', {
    successRedirect: '/',
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
