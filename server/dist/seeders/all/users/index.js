'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.seedUsers = undefined;

var _UsersModel = require('../../../models/users/UsersModel');

var _UsersModel2 = _interopRequireDefault(_UsersModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var seedUsers = exports.seedUsers = function seedUsers(users) {
  return new Promise(function (resolve, reject) {
    Promise.all(users.map(function (user) {
      var userDoc = new _UsersModel2.default(user);
      return userDoc.save();
    })).then(function () {
      resolve();
    }).catch(function () {
      reject();
    });
  });
};