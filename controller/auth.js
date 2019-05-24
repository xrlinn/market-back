const jwt = require('jsonwebtoken');

function verifyToken (token) {
    return new Promise ((resolve,reject) => {
        jwt.verify(token, 'xrl', (err,data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data.data)
        })
    })
}

async function auth(req,res,next) {
    try{
        const token = req.headers.token || req.body.token || req.query.token;
        const userData = await verifyToken(token);
        if (userData) { // 判断用户是否登陆
            req.user = userData;
            next()
        } else {
            res.json({
                code: 401,
                msg: '登录状态已失效，请重新登陆'
            })
        }   
    } catch (err) {
        res.json({
            code: 401,
            msg: '登录状态已失效，请重新登陆'
        })    
    }
}

module.exports = auth