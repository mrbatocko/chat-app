'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    DB_HOST = _process$env.DB_HOST,
    DB_PORT = _process$env.DB_PORT,
    DB_NAME = _process$env.DB_NAME;

// Function to connect to mongo server

exports.default = function (success) {
  _mongoose2.default.connect(DB_HOST + ':' + DB_PORT + '/' + DB_NAME, { useNewUrlParser: true });
  _mongoose2.default.connection.once('open', success);
};