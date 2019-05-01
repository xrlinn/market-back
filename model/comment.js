const mongoose = require('mongoose')

const comment = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    text: String,
    img: String,
},{versionKey: false, timestamps:{createdAt:'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('comment', comment)
