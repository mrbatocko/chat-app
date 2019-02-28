'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _mongooseTimestamp = require('mongoose-timestamp');

var _mongooseTimestamp2 = _interopRequireDefault(_mongooseTimestamp);

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SALT_WORK_FACTOR = 10;

var UserSchema = new _mongoose2.default.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER'
  },
  password: {
    type: String,
    required: true
  },
  online: {
    type: Boolean,
    default: false
  },
  status_message: {
    type: String,
    minlength: 5,
    maxlength: 40,
    default: 'Hi there. I\'m using chatapp.'
  },
  status: {
    type: String,
    enum: ['available', 'away', 'do-not-disturb'],
    default: 'available'
  },
  sent_requests: {
    type: Array,
    default: []
  },
  received_requests: {
    type: Array,
    default: []
  },
  chats: {
    type: Array,
    default: []
  },
  avatar: {
    type: String
  }
});

UserSchema.plugin(_mongooseTimestamp2.default);

UserSchema.pre('save', function (next) {
  var user = this;
  if (!user.isModified('password')) {
    next();
  } else {
    _bcrypt2.default.genSalt(SALT_WORK_FACTOR, function (err, salt) {
      if (err) {
        next(err);
      } else {
        _bcrypt2.default.hash(user.password, salt, function (err, hash) {
          if (err) {
            next(err);
          } else {
            user.password = hash;
            next();
          }
        });
      }
    });
  }
});

UserSchema.methods.validatePassword = function (password) {
  var _this = this;

  return new Promise(function (resolve, reject) {
    _bcrypt2.default.compare(password, _this.password, function (error, valid) {
      if (error) {
        reject(error);
      } else if (valid) {
        resolve();
      } else {
        reject({ message: 'Password is incorrect.' });
      }
    });
  });
};

exports.default = UserSchema;