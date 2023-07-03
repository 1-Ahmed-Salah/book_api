const Joi = require('joi')

const createBookVlidate = Joi.object({
    title: Joi.string().trim().min(3).max(200).required(),
    author: Joi.string().required(),
    description: Joi.string().trim().min(3).required(),
    price: Joi.number().min(0).required(),
    cover: Joi.string().valid('soft cover', 'hard cover').required()
})


const updateBookVlidate = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.string(),
    description: Joi.string().trim().min(3),
    price: Joi.number().min(0),
    cover: Joi.string().valid('soft cover', 'hard cover')
})


module.exports = {
    createBookVlidate,
    updateBookVlidate
}
