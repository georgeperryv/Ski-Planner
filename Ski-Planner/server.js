var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session')
var passport = require('passport')
require('dotenv').config()
require('./config/database')
require('./config/passport')
// var methodOverride = require('method-override')

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
var resourcesRouter = require('./routes/resources')
// const { ServerResponse } = require('http')

var server = express()

// view engine setup
server.set('views', path.join(__dirname, 'views'))
server.set('view engine', 'ejs')

server.use(logger('dev'))
server.use(express.json())
server.use(express.urlencoded({ extended: false }))
server.use(cookieParser())
// server.use(methodOverride('_method'))

server.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
)
server.use(passport.initialize())
server.use(passport.session())

server.use(function (req, res, next) {
  //logged in user is in a user variable that's available inside all EJS templates. If no one is logged in, user will be undefined
  res.locals.user = req.user
  next()
})

server.use(express.static(path.join(__dirname, 'public')))

server.use('/', indexRouter)
server.use('/resources', resourcesRouter)
server.use('/users', usersRouter)

// catch 404 and forward to error handler
server.use(function (req, res, next) {
  next(createError(404))
})

// error handler
server.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = server
