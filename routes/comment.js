const {Router} = require('express')
const router = Router()
const {addCommentToCommodity} = require('../controller/comment')
const auth = require('../controller/auth')

router.post('/',auth,addCommentToCommodity)

module.exports = router