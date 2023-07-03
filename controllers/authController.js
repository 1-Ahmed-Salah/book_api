const asyncHandler = require('express-async-handler')
const { registerUserValidate, loginUserValidate } = require('../validators/userValidate')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

// @desc Register user
// @route POST /api/v1/auth/register
// @access public
const registerUser = asyncHandler(async (req, res) => {

    const { email, username, password, isAdmin } = req.body

    const { error } = registerUserValidate.validate(req.body)

    if(error) {
        res.status(400)
        throw new Error( error.details[0].message )
    }

    const emailExists = await User.findOne({email})

    if(emailExists) {
        res.status(400)
        throw new Error('Email already exists')
    }

    const user = await User.create({
        email,
        username,
        password,
        isAdmin
    })

    if(user) {
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }

})

// @desc Login user
// @route POST /api/v1/auth/login
// @access public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const { error } = loginUserValidate.validate(req.body)

    if(error) {
        res.status(400)
        throw new Error(error.details[0].message)
    }

    const user = await User.findOne({email})

    if(!user) {
        res.status(400)
        throw new Error('Invalid email')
    }

    if(!await user.matchPassword(password)) {
        res.status(400)
        throw new Error('Invalid password')
    }

    if(user && ( await user.matchPassword(password) )) {
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            token: generateToken(user._id)
        })
    }

})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'User logged out'})
})

module.exports = {
    registerUser,
    loginUser,
    logoutUser
}