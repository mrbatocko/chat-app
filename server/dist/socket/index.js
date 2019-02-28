'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _ChatsCtrl = require('../controllers/chats/ChatsCtrl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (server) {
  var io = (0, _socket2.default)(server, { serveClient: false });
  io.origins(['localhost:3001']);

  (0, _ChatsCtrl.chatMetaConnectionsHandle)(io.of('/meta'));
};