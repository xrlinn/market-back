const {Router} = require('express');
const router = Router();
const auth = require('../controller/auth')
const {upload} = require('../controller/upload')


router.get('/', auth, upload)
router.get('/admin', upload)

module.exports = router