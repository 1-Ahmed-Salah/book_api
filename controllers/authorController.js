const asyncHandler = require('express-async-handler')
const { createAuthorValidate, updateAuthorValidate } = require('../validators/authorValidate')
const Author = require('../models/authorModel')

// @desc Get an author
// @route GET /api/v1/author/:id
// @access public
const getAuthor = asyncHandler(async(req, res) => {

    const author = await Author.findById(req.params.id)

    if(author) {
        res.status(200).json({
            _id: author.id,
            firstName: author.firstName,
            lastName: author.lastName,
        })
    } else {
        res.status(404).json({message: 'author not found'})
    }

})

// @desc Get all authors
// @route GET /api/v1/author
// @access public
const getAuthors = asyncHandler(async (req, res) => {
    const authors = await Author.find({}).sort({firstName: 1}).select('firstName lastName');
    res.status(200).json(authors)
})

// @desc Create an author
// @route POST /api/v1/author
// @access public
const insertAuthor = asyncHandler(async (req, res) => {

    const { firstName, lastName, nationality, image } = req.body

    const { error } = createAuthorValidate.validate(req.body)

    if(error) {
        res.status(400)
        throw new Error(error.details[0].message)
    }

    const author = await Author.create({
        firstName,
        lastName,
        nationality,
        image
    })

    if(author) {
        res.status(201).json({
            _id: author.id,
            firstName: author.firstName,
            lastName: author.lastName,
        })
    }
    
})

// @desc Update an author
// @route PUT /api/v1/author/:id
// @access public
const updateAuthor = asyncHandler(async (req, res) => {

    const author = await Author.findById(req.params.id)

    if(!author) {
        res.status(404)
        throw new Error('Author not found')
    }

    const { error } = updateAuthorValidate.validate(req.body)

    if(error) {
        res.status(400)
        throw new Error(error.details[0].message)
    }

    const updateAuthor = await Author.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json({
        _id: author.id,
        firstName: updateAuthor.firstName,
        lastName: updateAuthor.lastName,
    })

})

// @desc Delete an author
// @route DELETE /api/v1/author/:id
// @access public
const deleteAuthor = asyncHandler(async (req, res) => {

    const author = await Author.findById(req.params.id)

    if(!author) {
        res.status(404)
        throw new Error('Author not found')
    }

    const deleteAuthor = await Author.findByIdAndRemove(req.params.id)

    res.status(200).json({
        _id: author.id,
        firstName: deleteAuthor.firstName,
        lastName: deleteAuthor.lastName,
    })
})

module.exports = {
    getAuthor,
    getAuthors,
    insertAuthor,
    updateAuthor,
    deleteAuthor
}

