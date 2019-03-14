'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChatsModel = require('../../models/chats/ChatsModel');

var _ChatsModel2 = _interopRequireDefault(_ChatsModel);

var _UsersModel = require('../../models/users/UsersModel');

var _UsersModel2 = _interopRequireDefault(_UsersModel);

var _ChatRequestsModel = require('../../models/chat-requests/ChatRequestsModel');

var _ChatRequestsModel2 = _interopRequireDefault(_ChatRequestsModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OFFLINE_TIMEOUT = 5000; // Prevent going offline after disconnect event for this amount of time
var OFFLINE_TIMEOUT_HANDLE = null;

exports.default = function (connectionSocket) {
  connectionSocket.on('connection', function (socket) {
    if (socket.handshake.query.username) {
      socket.join(socket.handshake.query.username);
      clearTimeout(OFFLINE_TIMEOUT_HANDLE);
      _UsersModel2.default.findOne({ username: socket.handshake.query.username }).then(function (user) {
        if (!user.online) {
          user.online = true;
          user.save();
        }
      }).catch(function (error) {
        cb(error);
      });
    }
    socket.on('disconnect', function () {
      OFFLINE_TIMEOUT_HANDLE = setTimeout(function () {
        _UsersModel2.default.findOne({ username: socket.handshake.query.username }).then(function (user) {
          user.online = false;
          user.save();
        }).catch(function (error) {
          cb(error);
        });
      }, OFFLINE_TIMEOUT);
    });
    socket.on('get-chat-data', function (_ref, cb) {
      var username = _ref.username;

      Promise.all([_UsersModel2.default.findOne({ username: username }), _ChatsModel2.default.findOne({ 'participants.username': username })]).then(function (data) {
        cb(null, { user: data[0], chat: data[1] });
      });
    });
    socket.on('status-message-change', function (_ref2, cb) {
      var status_message = _ref2.status_message,
          username = _ref2.username;

      if (username) {
        _UsersModel2.default.findOne({ username: username }).then(function (user) {
          user.status_message = status_message;
          user.save().then(function () {
            cb(null);
          }).catch(function (error) {
            cb(error);
          });
        }).catch(function (error) {
          cb(error);
        });
      } else {
        cb(new Error('Please provide a username.'));
      }
    });
    socket.on('status-change', function (_ref3, cb) {
      var status = _ref3.status,
          username = _ref3.username;

      if (username) {
        _UsersModel2.default.findOne({ username: username }).then(function (user) {
          user.status = status;
          user.save().then(function () {
            cb(null);
          }).catch(function (error) {
            cb(error);
          });
        }).catch(function (error) {
          cb(error);
        });
      } else {
        cb(new Error('Please provide a username.'));
      }
    });
    socket.on('search-users', function (_ref4, cb) {
      var username = _ref4.username;

      if (username) {
        _UsersModel2.default.find({ username: new RegExp(username, 'i') }, 'username avatar').then(function (users) {
          cb(null, users);
        }).catch(function (error) {
          cb(error);
        });
      } else {
        cb(new Error('Please provide a username.'));
      }
    });
    socket.on('chat-request', function (_ref5, cb) {
      var from = _ref5.from,
          to = _ref5.to;

      if (from && from.username && from.avatar && to && to.username && to.avatar) {
        _ChatRequestsModel2.default.create({ from: from, to: to }).then(function (request) {
          socket.to(to.username).emit('chat-request', request);
          cb();
        });
      } else {
        cb(new Error('Please provide a from and to params.'));
      }
    });
    socket.on('chat-request-action', function (_ref6, cb) {
      var requestData = _ref6.requestData,
          action = _ref6.action;

      if (requestData.from && requestData.to && action) {
        _ChatRequestsModel2.default.findOne({ $and: [{ 'from.username': requestData.from.username }, { 'to.username': requestData.to.username }] }).then(function (request) {
          if (action === 'approve') {
            _ChatsModel2.default.create({ participants: [requestData.from, requestData.to] }).then(function (chat) {
              request.status = 'approved';
              request.save();
              cb(null, chat);
              socket.to(requestData.from.username).emit('request-approved', chat);
            });
          } else {
            request.status = 'denied';
            request.save();
            cb(null, false);
          }
        });
      } else {
        cb(new Error('Please provide a valid data.'));
      }
    });
  });
};