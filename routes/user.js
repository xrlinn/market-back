const {Router} = require('express')
const router = Router()
const {register, login, getUserById, changePassword, changeUser} = require('../controller/user')
const auth = require('../controller/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/', auth, getUserById)
router.put('/', auth, changeUser)
router.post('/changePassword', auth, changePassword)

module.exports = router