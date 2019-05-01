var express = require('express');
var router = express.Router();
const commodityRouters = require('./commodity')
const categoryRouters = require('./category')
const swiperRouters = require('./swiper')

router.use('/commodity', commodityRouters)
router.use('/category', categoryRouters)
router.use('/swiper', swiperRouters)

module.exports = router;
