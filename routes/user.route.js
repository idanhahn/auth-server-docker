var express = require('express');
let router = express.Router();
var passport = require('passport');


var userController = require('../controllers/user.controller');

// login
router.post('/login', userController.login)

// signup new user
router.post('/signup', userController.signup);

// get user by email
router.get('/userProfile/:email' , passport.authenticate('jwt', {session: false}), userController.get_user);



// TODO: add admin functions
//router.get('/:email', userController.get_user);



module.exports = router



