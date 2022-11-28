//VAILDATION   //40.
const Joi = require('@hapi/joi');

const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(6).required()
});


const loginSchema = Joi.object({
    email: Joi.string().min(8).required().email(),
    password: Joi.string().min(6).required()
});

module.exports = {
    registerSchema,
    loginSchema
}



/*
// Register Validation
const registerValidation = (data) => {   //41.
    const schema = {    //schema with validation  //40. -- wrap it in a function coz we might have multiple schemas depending on wt v gonna do.
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data,schema); //42.
};

const loginValidation = data => {
    const schema = {    //schema with validation
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    };
    return Joi.validate(data,schema);
};

module.exports.registerValidation = registerValidation;  //43.
module.exports.loginValidation = loginValidation;
*/