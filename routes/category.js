const {Router} = require('express')
const router = Router()
const {addCategory,
        getCategory,
        addCommodityToCategory,
        getCommodityOfCategory,
        getCommodityByCategory,
        deleteCategory} = require('../controller/category')

router.post('/',addCategory)
router.get('/',getCategory)
router.delete('/:id',deleteCategory)
router.post('/commodity', addCommodityToCategory)
router.get('/commodity', getCommodityOfCategory)
router.post('/commodities', getCommodityByCategory)

module.exports = router