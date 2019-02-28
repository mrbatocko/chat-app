'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _openConnection = require('../../db/openConnection');

var _openConnection2 = _interopRequireDefault(_openConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _openConnection2.default)(function () {
  _mongoose2.default.connection.dropDatabase().then(function () {
    _mongoose2.default.disconnect().then(function () {
      process.exit(0);
    }).catch(function (error) {
      console.error('Cannot disconnect from db', error);
      process.exit(1);
    });
  }).catch(function (error) {
    console.error('Cannot drop db', error);
    process.exit(1);
  });
});