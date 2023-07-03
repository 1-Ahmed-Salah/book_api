const express = require('express')
const router = express.Router()
const { getBook, getBooks, insertBook, updateBook, deleteBook } = require('../controllers/bookController')
const protect = require('../middlewares/authMiddleware')
const { onlyAdmin } = require('../middlewares/adminMiddleware')

router.route('/').get(getBooks).post(protect, onlyAdmin, insertBook)
router.route('/:id').get(getBook).put(protect, onlyAdmin, updateBook).delete(protect, onlyAdmin, deleteBook)

module.exports = router