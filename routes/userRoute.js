var express = require('express');
let router = express.Router();

var userController = require('../controllers/userController');

// get user by email
router.get('/:email', userController.get_user);

// create user
router.post('/', userController.create_user);

module.exports = router
