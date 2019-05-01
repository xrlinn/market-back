const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/market-html',{useNewUrlParser: true})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
    console.log("mongdb数据库连接成功")
});

module.exports = db;
