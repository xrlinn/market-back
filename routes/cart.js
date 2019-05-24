const {Router} = require('express')
const router = Router()
const {addcart, getcart, deletecart} = require('../controller/cart')
const auth = require('../controller/auth')

router.post('/', auth, addcart)
router.get('/', auth, getcart)
router.delete('/:id', auth, deletecart)

module.exports = router