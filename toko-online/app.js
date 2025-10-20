var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var productRouter = require("./app_toko_online/routers/product");
var indexRouter = require('./app_toko_online/routers/index');
var usersRouter = require('./app_toko_online/routers/users');
var engine = require('ejs-blocks'); //menggunakan ejs blok
var app = express();
require("./app_toko_online/models/db"); // panggil db
var apiProductRouter = require("./app_toko_online/routers/api/product");
var apiUsertRouter = require("./app_toko_online/routers/api/user");
var apiOrderRouter = require("./app_toko_online/routers/api/order");

// view engine setup
app.set('views', path.join(__dirname, 'app_toko_online', 'view')); // perbaikan ke 1
app.engine('ejs', engine); //daftarkan engine ejs blok
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//serving static bootstrap
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/produk", productRouter);
app.use("/api/product",apiProductRouter);
app.use("/api/users",apiUsertRouter);
app.use("/api/order",apiOrderRouter);
//app.use("/api/user",apiUserRouter);


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