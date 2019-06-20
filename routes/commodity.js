const {Router} = require('express')
const router = Router()
const {addCommodity, getAllCommodity,  getCommodityById,deleteCommodity,addCommodityToCategory} = require('../controller/commodity')

router.post('/', addCommodity)
router.post('/toCategory', addCommodityToCategory)
router.get('/', getAllCommodity)
router.get('/:id',  getCommodityById)
router.delete('/:id',  deleteCommodity)

module.exports = router
