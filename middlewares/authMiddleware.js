const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

const protect = asyncHandler(async (req, res, next) => {

    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            
            // Get token from header
            token = req.headers.authorization.split(' ')[1]

            // decode the token
            const decode = jwt.verify(token, process.env.JWT_SECRET_KEY)

            // check if user exists
            req.user = await User.findById(decode.id).select('-password')

            next()

        } catch (error) {
            res.status(401)
            throw new Error('Not authorized, invalid token')
        }
        
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }

})

module.exports = protect

