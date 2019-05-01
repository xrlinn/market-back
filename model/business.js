const mongoose = require('mongoose')

const business = mongoose.Schema({
    nickname: String,
    avatar: {
        type: String,
        default: 'http://pbl.yaojunrong.com/FjTqJ40f94QfgeliPRF_-9g4ly3Q'
    },
    phone: {
        type: Number,
        unique: true
    },
    password: String,
    
},{versionKey: false, timestamps:{createdAt:'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('business', business)