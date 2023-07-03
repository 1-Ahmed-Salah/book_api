const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 200
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 200
    },
    nationality: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 25
    },
    image: {
        type: String,
        default: 'default-avatar.png',
    },
}, {timestamps: true})

module.exports = mongoose.model('Author', AuthorSchema)
