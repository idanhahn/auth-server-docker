var express = require('express');
let router = express.Router();
var passport = require('passport');
var jwtHelper = require('../helpers/jwtHelper');


var userController = require('../controllers/user.controller');

// login
router.post('/login', userController.login)

// signup new user
router.post('/signup', userController.signup);

// get user by email
router.get('/userProfile/:email' ,jwtHelper.verifyJwtToken, userController.get_user);

// TODO: add admin functions

module.exports = router



