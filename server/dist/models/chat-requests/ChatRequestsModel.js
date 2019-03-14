'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ChatRequestsSchema = require('./ChatRequestsSchema');

var _ChatRequestsSchema2 = _interopRequireDefault(_ChatRequestsSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _mongoose2.default.model('ChatRequest', _ChatRequestsSchema2.default);