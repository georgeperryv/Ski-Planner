module.exports = function isLoggedIn (req, res, next) {
  //if you are who you say you are, then, pass that information to the next url. you're allowed to go to whatever next url that you post
  if (req.isAuthenticated()) return next()
  //if not, you have to log in again
  res.redirect('/auth/google')
}
