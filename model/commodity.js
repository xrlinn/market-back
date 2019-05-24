const mongoose = require('mongoose')

const commodity = new mongoose.Schema({
   img: String,
   title: String,
   price: Number,
   paycounts: {
       type: Number,
       default: 0
   },
   comment: [{
       type: mongoose.SchemaTypes.ObjectId,
       ref: 'comment'
   }],
   like: {
       type: Number,
       default: 0
   },
   collections: {
       type: Number,
       default: 0
   },
   business: {
       type: mongoose.SchemaTypes.ObjectId,
       ref: 'business'
   },
   delivery: String,
   sales: {
       type: Number,
       default: 0
   }

},{versionKey: false, timestamps:{createdAt:'createTime',
updatedAt: 'updateTime'}})

module.exports = mongoose.model('commodity', commodity)