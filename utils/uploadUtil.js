const qiniu = require('qiniu')

var accessKey = 'ZvLMcCoUaE12xqnuvj2NZJst4wxTTFmTnYacuIEI';
var secretKey = 'aObVyqlez_II848COeixVvZalN1-UcV4BsBZ4h3e';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

module.exports = function () {
  var options = {
      scope: 'market-html', // 空间名
      returnBody: '{"key":"$(key)","hash":"$(etag)","fsize":$(fsize),"bucket":"$(bucket)","name":"$(x:name)", "url":"http://psq71tzun.bkt.clouddn.com/$(key)"}',
      expires: 3600,
      deadline: Math.round(new Date().getTime()/1000)*3600,
  };
  var putPolicy = new qiniu.rs.PutPolicy(options);
  var uploadToken=putPolicy.uploadToken(mac);
  return uploadToken
}
  
