const express = require('express')

 //env  variables
require('dotenv').config()

 //mongoDB user model
const User = require('../model/User');

 //mongoDB user verification model
const UserVerification = require('../model/UserVerification')

 //Token handler
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')


 //password handler
const bcrypt = require('bcrypt')

//import (signin, signup)validation
const { signupValidation, signinValidation } = require('../validation');


                                 //SIGNUP

exports.signup = async (req, res) => {

     //VALIDATE DATA BEFORE CREATIONG USER 
    const { error } = signupValidation(req.body);
    if(error) return res.status(400).json({
          status: "FAILED",
          message: error.details[0].message
        });
 
      //Checking if the user is already exist in the Database
     const emailExist = await User.findOne({email: req.body.email})
     if(emailExist) 
     return res.status(400).json({
        status: "FAILED",
        message: "Email already exists"
       })
 
      //Hash passwords
         const saltRounds =10
         const hashPassword = await bcrypt.hash(req.body.password, saltRounds)
       
      //Create a new user
     const user = new User({
         name: req.body.name,
         email: req.body.email,
         password: hashPassword,
         date: req.body.date
     });
     try {
         const savedUser = await user.save();
         res.json({ 
            status: "SUCCES",
            message: "Signup Successful ",
            savedUser
        });
 
     }catch(err){
         res.status(400).json({
            status:"FAILED",
            message: "Unable to save to DB"
         });
     }
 
     
}

                                       //SIGNIN

exports.signin = async (req, res) => {
   
    //VALIDATE DATA BEFORE CREATIONG USER 
    const { error } = signinValidation(req.body);
    if(error) return res.status(400).json({
         status:"FAILED",
         message: error.details[0].message
        });
   
    //Checking if the email exists
   const user = await User.findOne({email: req.body.email})
   if(!user) return res.status(400).json({
    status: "FAILED",
    message: 'Email is not found'
   })

    //PASSWORD IS CORRECT ?!
   const validPass = await bcrypt.compare(req.body.password, user.password)
   if(!validPass) return res.status(400).json({
      status:"FAILED",
      message:'Invalid Password'
   }) 

   

   
     //Create and assign a token
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
      status: "SUCCESS",
      message: "Signin Successful",
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
        status: "FAILED",
        message: "User Signout Successful"
    })
}

