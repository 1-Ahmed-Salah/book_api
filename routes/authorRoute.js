const express = require('express')
const router = express.Router()
const { getAuthor, getAuthors, insertAuthor, updateAuthor, deleteAuthor } = require('../controllers/authorController')
const protect = require('../middlewares/authMiddleware')
const { onlyAdmin } = require('../middlewares/adminMiddleware')

router.route('/').get(getAuthors).post( protect, onlyAdmin, insertAuthor)
router.route('/:id').get(getAuthor).put(protect, onlyAdmin, updateAuthor).delete(protect, onlyAdmin, deleteAuthor)

module.exports = router
