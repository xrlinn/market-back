const {Router} = require('express')
const router = Router()
const {addCategory,
        getCategory,
        addCommodityToCategory,
        getCommodityOfCategory,
        getCommodityByCategory} = require('../controller/category')

router.post('/',addCategory)
router.get('/',getCategory)
router.post('/commodity', addCommodityToCategory)
router.get('/commodity', getCommodityOfCategory)
router.get('/:id/commoditys', getCommodityByCategory)

module.exports = router