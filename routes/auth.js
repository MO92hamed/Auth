const router = require('express').Router();

const { 
    signup,
    signin,
    signout 
} = require('../controllers/auth')

//SIGNUP
router.post('/signup', signup);

//SIGNIN
router.post('/signin', signin)  

//SIGNOUT
router.post('/signout', signout)

module.exports = router;