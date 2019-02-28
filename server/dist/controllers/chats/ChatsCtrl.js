'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.chatMetaConnectionsHandle = exports.getUserChats = undefined;

var _ChatsModel = require('../../models/chats/ChatsModel');

var _ChatsModel2 = _interopRequireDefault(_ChatsModel);

var _UsersModel = require('../../models/users/UsersModel');

var _UsersModel2 = _interopRequireDefault(_UsersModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var OFFLINE_TIMEOUT = 5000; // Prevent going offline after disconnect event for this amount of time
var OFFLINE_TIMEOUT_HANDLE = null;

var getUserChats = exports.getUserChats = function getUserChats(req, res) {
  _ChatsModel2.default.find({ from: req.user.username }).then(function (chats) {
    res.send({ chats: chats });
  }).catch(function (error) {
    res.status(500).send(error);
  });
};

var chatMetaConnectionsHandle = exports.chatMetaConnectionsHandle = function chatMetaConnectionsHandle(connectionSocket) {
  connectionSocket.on('connection', function (socket) {
    if (socket.handshake.query.username) {
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
    socket.on('status-message-change', function (_ref, cb) {
      var status_message = _ref.status_message,
          username = _ref.username;

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
    socket.on('status-change', function (_ref2, cb) {
      var status = _ref2.status,
          username = _ref2.username;

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
    socket.on('search-user', function (username, cb) {
      if (username) {
        _UsersModel2.default.find({ username: new RegExp(username, 'i') }).then(function (mongoUsers) {
          var users = mongoUsers.map(function (mUser) {
            var user = Object.assign({}, mUser._doc);
            delete user.chats;
            delete user.password;
            return user;
          });
          cb(null, users);
        }).catch(function (error) {
          cb(error);
        });
      } else {
        cb(new Error('Please provide a username.'));
      }
    });
    socket.on('chat-request', function (_ref3, cb) {
      var from = _ref3.from,
          to = _ref3.to;

      console.log(from);
      if (from && to) {
        _UsersModel2.default.findOne({ username: to }).then(function (fromUser) {
          if (fromUser.chats) {
            var exists = fromUser.chats.includes(function (chat) {
              return chat.with._id === from._id;
            });
            if (!exists) {
              fromUser.chats.push({ with: from, status: 'pending' });
            }
          } else {
            fromUser.chats = [{ with: from, status: 'pending' }];
          }
          fromUser.save().then(function () {
            cb(null, true);
          }).catch(function (error) {
            cb(error);
          });
        }).catch(function (error) {
          console.log(error);
          cb(error);
        });
      } else {
        cb(new Error('Please provide a from and to usernames.'));
      }
    });
    socket.on('chat-request-action', function (_ref4, cb) {
      var from = _ref4.from,
          to = _ref4.to,
          action = _ref4.action;

      if (from && to && action) {
        _UsersModel2.default.findOne({ username: to.username }).then(function (mongoUser) {
          var chats = mongoUser.chats.filter(function (chat) {
            return chat.with.username === from.username;
          });
          if (chats && chats.length) {
            chats[0].status = action;
            mongoUser.save().then(function () {
              cb();
            }).catch(function (error) {
              cb(error);
            });
          } else {
            cb(new Error('Something happened.'));
          }
        }).catch(function (error) {
          cb(error);
        });
      } else {
        cb(new Error('Please provide a valid data.'));
      }
    });
  });
};