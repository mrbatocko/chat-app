'use strict';

var _openConnection = require('./openConnection');

var _openConnection2 = _interopRequireDefault(_openConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _openConnection2.default)(function () {
  console.log('Connected to mongo server.');
});