const mongoose = require('mongoose')

const order = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    commodity: [
        {
            id : {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'commodity'
            },
            num: Number,
            price: Number
        }
    ],
    totalprice: Number,
    status: {
        type: Number,
        default: 1
        // 1 待付款
        // 2 待发货
        // 3 待收货
        // 4 待评价
    },
},{versionKey:false, timestamps: {createdAt: 'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('order', order)