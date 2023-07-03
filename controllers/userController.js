const asyncHandler = require('express-async-handler')
const { updateUserValidate } = require('../validators/userValidate')
const User = require('../models/userModel')
const bcrypt = require('bcryptjs')

// @desc Get all users
// @route Get /api/v1/users
// @access private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).select('-password')
    res.status(200).json(users)
})

// @desc Get a users
// @route Get /api/v1/users/:id
// @access private
const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(!user) {
        res.status(404)
        throw new Error('User not found')
    }

    res.status(200).json(user)

})

// @desc Update user
// @route put /api/v1/users/update/:id
// @access private
const updateUser = asyncHandler(async (req, res) => {

    const user = await User.findById(req.params.id)

    if(!user) {
        res.status(404)
        throw new Error('User not found')
    }

    const { error } = updateUserValidate.validate(req.body)

    if(error) {
        res.status(400)
        throw new Error(error.details[0].message)
    }

    if(req.body.password) {
        const salt = await bcrypt.genSalt(10)
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }

    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, {new: true}).select('-password -isAdmin')

    res.status(200).json(updateUser)

})

// @desc Delete a user
// @route Delete /api/v1/users/:id
// @access private
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password -isAdmin')
    if(!user) {
        res.status(404)
        throw new Error('User not found')
    }

    const deleteUser = await User.findByIdAndRemove(req.params.id)
    res.status(200).json({message: 'User deleted successfully'})
})

module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}

