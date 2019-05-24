var express = require('express');
var router = express.Router();
const commodityRouters = require('./commodity')
const categoryRouters = require('./category')
const swiperRouters = require('./swiper')
const userRouters = require('./user')
const smsCodeRouters = require('./smsCode')
const uploadRouters = require('./upload')
const traceRouters = require('./trace')
const collectionRouters = require('./collection')
const likeRouters = require('./like')
const cartRouters = require('./cart')
const orderRouters = require('./order') 

router.use('/commodity', commodityRouters)
router.use('/category', categoryRouters)
router.use('/swiper', swiperRouters)
router.use('/user', userRouters)
router.use('/smsCode', smsCodeRouters)
router.use('/uploadToken', uploadRouters)
router.use('/trace', traceRouters)
router.use('/collect', collectionRouters)
router.use('/like', likeRouters)
router.use('/cart', cartRouters)
router.use('/order', orderRouters)

module.exports = router;
