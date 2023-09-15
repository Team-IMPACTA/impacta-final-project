const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/authentication');
const passport = require('passport');
var eventsRouter = require('./routes/events');
const session = require('express-session');

var bodyParser = require('body-parser');

function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect('/auth/login');
}

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urlencoded
//app.use(bodyParser.json()) // parse application/json

app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

// Init passport configuration
require('./auth')(passport);
app.use(session({
  secret: '01011995',//configure um segredo seu aqui,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 30 * 60 * 1000 }//30min
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  res.locals.userSession = (req.user) ? req.user : false;
  console.log("Usuário:")
  console.log(req.user)
  next();
});

app.use('/auth', authRouter);
app.use('/user', usersRouter);
app.use('/', indexRouter);
app.use('/evento', authenticationMiddleware, eventsRouter);
app.use('/events', eventsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
