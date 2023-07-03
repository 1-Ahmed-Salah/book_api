const mongoose = require('mongoose')

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 200
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
    },
    price: {
        type: Number,
        required: true,
        minLength: 0
    },
    cover: {
        type: String,
        required: true,
        trim: true,
        enum: ['soft cover', 'hard cover']
    }
}, {timestamps: true})

module.exports = mongoose.model('Book', BookSchema)
