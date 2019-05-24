const {Router} = require('express')
const router = Router()
const {AddOrder,
    getAllOrder,
    getOrder1,
    getOrder2,
    getOrder3,
    deleteOrderById,
    changeOrderStatus,
    getOrder4} = require('../controller/order')
const auth = require('../controller/auth')

router.post('/',auth,AddOrder)
router.get('/',getAllOrder)
router.get('/status1',getOrder1)
router.get('/status2',getOrder2)
router.get('/status3',getOrder3)
router.get('/status4',getOrder4)
router.delete('/:id',deleteOrderById)
router.put('/:id',changeOrderStatus)

module.exports = router