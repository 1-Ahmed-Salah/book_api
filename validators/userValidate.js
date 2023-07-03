const Joi = require('joi')

const registerUserValidate = Joi.object({
    email: Joi.string().trim().min(5).max(100).email().required(),
    username: Joi.string().trim().min(2).max(200).required(),
    password: Joi.string().trim().min(6).required(),

})

const loginUserValidate = Joi.object({
    email: Joi.string().trim().min(5).max(100).email().required(),
    password: Joi.string().trim().min(6).required(),
})

const updateUserValidate = Joi.object({
    email: Joi.string().trim().min(5).max(100).email(),
    username: Joi.string().trim().min(2).max(200),
    password: Joi.string().trim().min(6),
})

module.exports = {
    registerUserValidate,
    loginUserValidate,
    updateUserValidate
}
