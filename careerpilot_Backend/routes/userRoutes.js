const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/signup', userController.userSignup);
router.post('/login', userController.userLogin);
router.post('/logout', userController.logoutUser);

module.exports = router;