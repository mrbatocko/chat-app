'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _ChatMetaCtrl = require('../controllers/chats/ChatMetaCtrl');

var _ChatMetaCtrl2 = _interopRequireDefault(_ChatMetaCtrl);

var _ChatCtrl = require('../controllers/chats/ChatCtrl');

var _ChatCtrl2 = _interopRequireDefault(_ChatCtrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (server) {
  var io = (0, _socket2.default)(server, { serveClient: false });
  io.origins(['localhost:3001']);

  (0, _ChatMetaCtrl2.default)(io.of('/meta'));
  (0, _ChatCtrl2.default)(io.of('/chat'));
};