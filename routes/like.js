const {Router} = require('express')
const router = Router()
const {addLike, getLike,deleteLike} = require('../controller/like')
const auth = require('../controller/auth')

router.post('/', auth, addLike)
router.get('/', auth, getLike)
router.delete('/:id', auth, deleteLike)

module.exports = router