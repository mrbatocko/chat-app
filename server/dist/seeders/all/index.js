'use strict';

var _openConnection = require('../../db/openConnection');

var _openConnection2 = _interopRequireDefault(_openConnection);

var _users = require('./users');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var users = [{
  username: 'mrbatocko',
  password: 'batocko93',
  role: 'ADMIN',
  status_message: 'Hello, world!',
  avatar: 'mrbatocko.jpeg'
}, {
  username: 'vlada',
  password: 'vladakomren',
  avatar: 'vlada.jpeg'
}];

(0, _openConnection2.default)(function () {
  Promise.all([(0, _users.seedUsers)(users)]).then(function () {
    process.exit(0);
  }).catch(function () {
    process.exit(1);
  });
});