const mongoose = require('mongoose')

const swiper = new mongoose.Schema({
    commodity: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'commodity'
    },
    img: String,
    status: {
        type: Number,
        default: 1
    },
    index: {
        type: Number,
        default: 1
    }
},{versionKey: false, timestamps:{createdAt:'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('swiper',swiper)
