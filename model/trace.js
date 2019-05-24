const mongoose = require('mongoose')

const trace = new mongoose.Schema({
    commodity: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'commodity'
    },
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    }
},{versionKey:false, timestamps: {createdAt: 'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('trace', trace)