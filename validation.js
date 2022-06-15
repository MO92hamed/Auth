//VALIDATION
const Joi = require('joi')

//Register Validation
const signupValidation = data => {
    const schema = Joi.object({ 
        name: Joi.string() 
                .min(6) 
                .required(),
        email: Joi.string() 
                .min(6) 
                .required() 
                .email(),
        password: Joi.string() 
                .min(6) 
                .required() 
    });
    return schema.validate(data)
}

//Login Validation
const signinValidation = data => {
    const schema = Joi.object({ 
        email: Joi.string() 
                .min(6) 
                .required() 
                .email(),
        password: Joi.string() 
                .min(6) 
                .required() 
    });
    return schema.validate(data)
}

module.exports.signupValidation = signupValidation
module.exports.signinValidation = signinValidation