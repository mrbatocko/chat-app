'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _ChatsSchema = require('./ChatsSchema');

var _ChatsSchema2 = _interopRequireDefault(_ChatsSchema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChatModel = _mongoose2.default.model('Chat', _ChatsSchema2.default);

exports.default = ChatModel;