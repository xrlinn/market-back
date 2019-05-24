const mongoose = require('mongoose')

const orderdetails = new mongoose.Schema({
    commodityId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'commodity'
    },
    num: Number,
    price: Number
},{versionKey:false, timestamps: {createdAt: 'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('orderdetails', orderdetails)