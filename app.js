var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./models');
var flash = require('express-flash');
var session = require('express-session');

var bookRouter = require('./routes/book');
var usersRouter = require('./routes/users');
var auth = require = require('./middlewire/auth');

db.sequelize.sync({force: false})
.then(() => console.log('Successfully synced Models with DB'))
.catch((err) => console.error(err));

var app = express();

app.use(session({
  secret: 'hb7#86$BY8fFYVAF-GAFO&7g9@GVBFNjaldfs.878562ihn',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 365,
  },
}));

app.use(flash());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/books', [auth, bookRouter]);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

module.exports = app;
