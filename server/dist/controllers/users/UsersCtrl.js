'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUserData = exports.Login = exports.Register = undefined;

var _UsersModel = require('../../models/users/UsersModel');

var _UsersModel2 = _interopRequireDefault(_UsersModel);

var _ChatRequestsModel = require('../../models/chat-requests/ChatRequestsModel');

var _ChatRequestsModel2 = _interopRequireDefault(_ChatRequestsModel);

var _ChatsModel = require('../../models/chats/ChatsModel');

var _ChatsModel2 = _interopRequireDefault(_ChatsModel);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Register = exports.Register = function Register(req, res) {
  if (req.body.use_default_status_message) {
    delete req.body.status_message;
  }
  _UsersModel2.default.create(req.body).then(function (mongoUser) {
    var user = Object.assign({}, mongoUser._doc);
    delete user.password;
    res.send(user);
  }).catch(function (error) {
    res.status(422).send(error);
  });
};

var Login = exports.Login = function Login(req, res) {
  var _req$body = req.body,
      username = _req$body.username,
      password = _req$body.password;

  _UsersModel2.default.findOne({ username: username }).then(function (mongoUser) {
    if (!mongoUser) {
      res.status(422).send({ message: 'User does not exist.' });
    } else {
      mongoUser.validatePassword(password).then(function () {
        var user = Object.assign({}, mongoUser._doc);
        delete user.password;
        delete user.chatRequests;
        delete user.updatedAt;
        delete user.createdAt;
        _jsonwebtoken2.default.sign(user, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXP }, function (error, token) {
          if (!error) {
            res.send({ token: token });
          } else {
            res.status(500).send(error);
          }
        });
      }).catch(function (error) {
        res.status(401).send({ message: 'Invalid password', error: error });
      });
    }
  }).catch(function (error) {
    res.status(422).send(error);
  });
};

var getUserData = exports.getUserData = function getUserData(req, res) {
  _UsersModel2.default.findOne({ username: req.user.username }, { password: 0 }).then(function (user) {
    Promise.all([_ChatsModel2.default.find({ 'participants.username': user.username }), _ChatRequestsModel2.default.find({ $and: [{ 'to.username': user.username }, { status: 'pending' }] })]).then(function (data) {
      res.send({
        user: user,
        chats: data[0],
        chat_requests: data[1]
      });
    });
  }).catch(function (error) {
    res.status(422).send(error);
  });
};