const {Router} = require('express');
const router = Router();
const {getTrace, deleteTrace} = require('../controller/trace')
const auth = require('../controller/auth')

router.get('/', auth, getTrace)
router.delete('/:id', auth, deleteTrace)

module.exports = router