var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride =  require('method-override');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
var producDetailRouter = require('./routes/productDetail');
var loginRouter = require('./routes/login');
var cartRouter = require('./routes/cart');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

//app routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/admin', adminRouter);
app.get('/admin/create', adminRouter);
app.post('/admin/create', adminRouter);
app.get('/admin/editor/:id', adminRouter);
app.put('/admin/editor/:id', adminRouter);
app.delete('/admin/delete/:id', adminRouter);
app.get('/detalle/:id', producDetailRouter);
app.get('/login', loginRouter);
app.get('/cart', cartRouter);

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
  res.render('error');
});

module.exports = app;
