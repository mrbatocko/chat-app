'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

exports.default = new _mongoose.Schema({
  from: {
    type: Object,
    required: true
  },
  to: {
    type: Object,
    required: true
  },
  status: {
    type: String,
    enum: ['approved', 'pending', 'denied'],
    default: 'pending'
  }
});