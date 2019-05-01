const mongoose = require('mongoose');

const category = new mongoose.Schema({
    title: String,
    commodity: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'commodity' // 指从创造的book集合中找到对应的ObjectId 那条数据
    }],
    index: {
        type: Number,
        default: 1
    },
    status: {
        type: Number,
        default: 1
    },
    
},{versionKey: false, timestamps: {createdAt: 'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('category', category)