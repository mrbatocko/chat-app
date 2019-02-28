'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _httpErrors = require('http-errors');

var _httpErrors2 = _interopRequireDefault(_httpErrors);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _expressJwt = require('express-jwt');

var _expressJwt2 = _interopRequireDefault(_expressJwt);

var _UsersRoutes = require('./routes/users/UsersRoutes');

var _UsersRoutes2 = _interopRequireDefault(_UsersRoutes);

var _ChatsRoutes = require('./routes/chats/ChatsRoutes');

var _ChatsRoutes2 = _interopRequireDefault(_ChatsRoutes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Auth routes
var app = (0, _express2.default)();

// Chats routes


app.use((0, _morgan2.default)('dev'));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: false }));
app.use((0, _cookieParser2.default)());
app.set('view engine', 'pug');

// Authenticate jwt
app.use((0, _expressJwt2.default)({ secret: process.env.JWT_SECRET }).unless({ path: ['/users/register', '/users/login'] }));

// Use /users routes
app.use('/users', _UsersRoutes2.default);

// Use /chats routes
app.use('/chats', _ChatsRoutes2.default);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next((0, _httpErrors2.default)(404));
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

exports.default = app;