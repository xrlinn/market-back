const mongoose = require('mongoose')

const cart = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    commodity: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'commodity'
    },
    status: {
        type: Number,
        default: 1
    },
    num: {
        type: Number,
        default: 1
    }
},{versionKey: false, timestamps: {createdAt: 'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('cart', cart)