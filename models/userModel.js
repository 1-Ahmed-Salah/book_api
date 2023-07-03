const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minLength: 5,
        maxLength: 100,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minLength: 2,
        maxLength: 200
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minLength: 6
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

UserSchema.pre('save', async function(next) { // before saving the schema do this function :)

    if(!this.isModified('password')) { // check if the password has not changed - if a new password
        next()
    }

    // hash the password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model('User', UserSchema)

