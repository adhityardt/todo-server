var express = require('express')
var router = express.Router()

const { registerUser, deleteUserById, loginUser } = require('../controllers/user.controller')

/* GET users listing. */
// router.post('/login', loginUser)

router.post('/login', loginUser)
router.post('/register', registerUser)
router.delete('/:id', deleteUserById)

module.exports = router
