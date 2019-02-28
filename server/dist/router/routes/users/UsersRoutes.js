'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _UsersCtrl = require('../../../controllers/users/UsersCtrl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post('/register', _UsersCtrl.Register);
router.post('/login', _UsersCtrl.Login);
router.get('/', _UsersCtrl.getUserData);

exports.default = router;