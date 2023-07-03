const Joi = require('joi');

const createAuthorValidate = Joi.object({
    firstName: Joi.string().trim().min(3).max(200).required(),
    lastName: Joi.string().trim().min(3).max(200).required(),
    nationality: Joi.string().trim().min(2).max(25).required(),
    image: Joi.string()
})


const updateAuthorValidate = Joi.object({
    firstName: Joi.string().trim().min(3).max(200),
    lastName: Joi.string().trim().min(3).max(200),
    nationality: Joi.string().trim().min(2).max(25),
    image: Joi.string()
})

module.exports = {
    createAuthorValidate,
    updateAuthorValidate
}
