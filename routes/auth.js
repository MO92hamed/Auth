const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { registerValidation, loginValidation } = require('../validation');
const { register ,login } = require('../controllers/auth')


router.post('/register', register);

//LOGIN
router.post('/login', login)  

module.exports = router;