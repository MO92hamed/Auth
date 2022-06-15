const express = require('express')
const User = require('../model/User');
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const bcrypt = require('bcrypt')
const { signupValidation, signinValidation } = require('../validation');
const router = require('../routes/weather');

exports.signup = async (req, res) => {
    //VALIDATE DATA BEFORE CREATIONG USER 
    // const { error } = schema.validate(req.body);
    const { error } = signupValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
 
     //checking if the user is already exist in the Database
     const emailExist = await User.findOne({email: req.body.email})
     if(emailExist) 
     return res.status(400).json({
        error: "Email already exists"
       })
 
     //Hash passwords
         const saltRounds =10
         const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
       
     //create a new user
     const user = new User({
         name: req.body.name,
         email: req.body.email,
         password: hashPassword,
         date: req.body.date
     });
     try {
         const savedUser = await user.save();
         res.json({ 
            message: "Success",
            savedUser
        });
 
     }catch(err){
         res.status(400).json({
            error: "Unable to save to DB"
         });
     }
 
}

exports.signin = async (req, res) => {
   
    //VALIDATE DATA BEFORE CREATIONG USER 
    const { error } = signinValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);
   
    //checking if the email exists
   const user = await User.findOne({email: req.body.email})
   if(!user) return res.status(400).json({
    error: 'Email is not found'
   })

    //PASSWORD IS CORRECT ?!
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if(!validPass) return res.status(400).json({
    error:'Invalid Password'
   }) 
   
    //create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
     //res.header('auth-token', token).send(token)

  // res.json({
   // message: 'Logged In!',
   // token
   //})

   //PUT TOKEN IN COOKIE
   res.cookie('token', token, {expire: new Date() + 1 })

   //SEND RESPONSE TO FRONTEND
   const {_id, name, email} = user
   return res.json ({
    token,
    user: {
        _id,
        name,
        email
    }
   })

}

exports.signout = (req, res) => {
    res.clearCookie('token')
    return res.json({
        message: "User Signout Successful"
    })
}
