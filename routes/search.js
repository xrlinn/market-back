const {Router} = require('express')
const router = Router()
const {getSearch} = require("../controller/search")

router.post('/', getSearch)

module.exports = router