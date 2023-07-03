const asyncHandler = require('express-async-handler')
const { createBookVlidate, updateBookVlidate } = require('../validators/bookValidate')
const Book = require('../models/bookModel')

// @desc Get a Book
// @route GET /api/v1/book/:id
// @access public
const getBook = asyncHandler(async(req, res) => {

    const book = await Book.findById(req.params.id).populate('author', ['_id', 'firstName', 'lastName', 'image'])

    if(book) {
        res.status(200).json(book)
    } else {
        res.status(404).json({message: 'Book not found'})
    }

})

// @desc Get Books
// @route GET /api/v1/book
// @access public
const getBooks = asyncHandler(async (req, res) => {

    const books = await Book.find({}).populate('author', ['_id', 'firstName', 'lastName', 'image'])

    res.status(200).json(books)
})

// @desc Create a Book
// @route POST /api/v1/book
// @access public
const insertBook = asyncHandler(async (req, res) => {

    const { title, author, description, price, cover } = req.body

    const { error } = createBookVlidate.validate(req.body)

    if(error) {
        res.status(400)
        throw new Error(error.details[0].message)
    }

    const book = await Book.create({
        title,
        author,
        description,
        price,
        cover
    })

    if(book) {
        res.status(200).json(book)
    }

})

// @desc Update a Book
// @route PUT /api/v1/book/:id
// @access public
const updateBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id)

    if(!book) {
        res.status(404)
        throw new Error('Book not found')
    }

    const { error } = updateBookVlidate.validate(req.body)

    if(error) {
        res.status(400)
        throw new Error(error.details[0].message)
    }

    const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {new: true})

    res.status(200).json(updateBook)
})

// @desc Delete a Book
// @route DELETE /api/v1/book/:id
// @access public
const deleteBook = asyncHandler(async (req, res) => {

    const book = await Book.findById(req.params.id)

    if(!book) {
        res.status(404)
        throw new Error('Book not found')
    }

    const deleteBook = await Book.findByIdAndRemove(req.params.id)


    res.status(201).json(deleteBook)
})

module.exports = {
    getBook,
    getBooks,
    insertBook,
    updateBook,
    deleteBook
}