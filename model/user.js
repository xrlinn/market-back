const mongoose = require('mongoose')

const user = new mongoose.Schema({
    avatar: {
        type: String,
        default: 'http://pbl.yaojunrong.com/FjTqJ40f94QfgeliPRF_-9g4ly3Q'
    },
    collected: {
        type: Number,
        default: 0
    },
    desc: String,
    address: String,
    phone: {
        type: Number,
        unique: true
    },
    password: String,
    usernickname: String,
    trace: {
        type: Number,
        default: 0
    },
    like: {
        type: Number,
        default: 0
    },
    cartnums: {
        type: Number,
        default: 0
    },
    isCanLogin:{
        type: Boolean,
        default: true
    }
},{versionKey:false, timestamps: {createdAt: 'createTime',
 updatedAt: 'updateTime'}})

module.exports = mongoose.model('user', user)