const mongoose = require('mongoose')

const comment = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    text: String,
    img: Array,
},{versionKey: false, timestamps:{createdAt:'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('comment', comment)
