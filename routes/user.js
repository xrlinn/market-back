const {Router} = require('express')
const router = Router()
const {register, login, getUserById, changePassword, changeUser,getAllUser,liftUser,limitUser} = require('../controller/user')
const auth = require('../controller/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/', auth, getUserById)
router.put('/', auth, changeUser)
router.put('/lift/:id', liftUser)
router.put('/limit/:id', limitUser)
router.get('/admin', getAllUser)
router.post('/changePassword', auth, changePassword)

module.exports = router