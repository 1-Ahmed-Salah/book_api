const express = require('express')
const router = express.Router()
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/userController')
const protect = require('../middlewares/authMiddleware')
const {checkAdmin, onlyAdmin} = require('../middlewares/adminMiddleware')

router.get('/',protect ,onlyAdmin, getAllUsers)
router.route('/:id').get(protect, checkAdmin, getUser).put(protect, checkAdmin, updateUser).delete(protect, checkAdmin, deleteUser)


module.exports = router