'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var ChatSchema = new _mongoose.Schema({
  participants: {
    type: Array,
    validate: {
      validator: function validator(value) {
        return value.length === 2;
      },
      message: 'Chat must have two participants'
    },
    required: true
  },
  messages: [{
    from: {
      type: String,
      required: true
    },
    to: {
      type: String,
      required: true
    },
    content: {
      type: String,
      validate: {
        validator: function validator(value) {
          return value.length >= 1;
        },
        message: 'Message content cannot be empty string.'
      }
    },
    sent_on: {
      type: Date,
      required: true
    }
  }]
});

exports.default = ChatSchema;