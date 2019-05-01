const {Router} = require('express')
const router = Router()
const {addCommodity, getAllCommodity,  getCommodityById} = require('../controller/commodity')

router.post('/', addCommodity)
router.get('/', getAllCommodity)
router.get('/:id',  getCommodityById)

module.exports = router
