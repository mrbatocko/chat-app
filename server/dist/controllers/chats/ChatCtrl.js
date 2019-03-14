'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChatsModel = require('../../models/chats/ChatsModel');

var _ChatsModel2 = _interopRequireDefault(_ChatsModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (connectionSocket) {
  connectionSocket.on('connection', function (socket) {
    socket.on('get-chat-messages', function (id, cb) {
      _ChatsModel2.default.findById(id).then(function (chat) {
        cb(null, chat);
      }).catch(function (error) {
        cb(error);
      });
    });
    socket.on('chat-message', function (_ref, cb) {
      var chatId = _ref.chatId,
          from = _ref.from,
          to = _ref.to,
          message = _ref.message,
          sent_on = _ref.sent_on;

      _ChatsModel2.default.findById(chatId).then(function (chat) {
        var messageToSave = {
          from: from.username,
          to: to.username,
          content: message,
          sent_on: sent_on,
          created_on: Date.now()
        };
        if (chat.messages && chat.messages.length) {
          chat.messages.push(messageToSave);
        } else {
          chat.messages = [messageToSave];
        }
        chat.save().then(function () {
          socket.broadcast.emit('message-received', { message: messageToSave });
          cb(null, messageToSave);
        }).catch(function (error) {
          cb(error);
        });
      }).catch(function (error) {
        cb(error);
      });
    });
  });
};