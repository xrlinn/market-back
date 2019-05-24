const commodityModel = require('../model/commodity')
const traceModel = require('../model/trace')
const userModel = require('../model/user')
const mongoose = require('mongoose')
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

async function addCommodity(req, res, next) {
    try {
        const {img,title,price,delivery} = req.body
        const commodity = await commodityModel.create({
            img,
            title,
            price,
            delivery
        })

        res.json({
            code: 200,
            msg: '商品发布成功'
        })

    } catch (err) {
        next ()
    }
}

async function getAllCommodity (req,res,next) {
    try {
        const data = await commodityModel.find()
        res.json({
            code: 200,
            data
        })

    } catch(err) {
        next()
    }
}

async function getCommodityById (req,res,next) {
    try {
        const token = req.headers.token || req.body.token || req.query.token;
        const {id} = req.params
        console.log(id)
        const data = await commodityModel.findById(id)
        if (token) {
            const userData = await verifyToken(token);
            if (userData) {
                req.user = userData;
                const userId = req.user.userId
                const user = await traceModel.findOne({
                    user: mongoose.Types.ObjectId(userId),
                    commodity: mongoose.Types.ObjectId(data._id)
                })
                if (user) {
                    await traceModel.update({commodity:mongoose.SchemaTypes.ObjectId(data._id)},
                    {
                        user: mongoose.Types.ObjectId(userId),
                        commodity: mongoose.Types.ObjectId(data._id)
                    })
                } else {
                    await traceModel.create({
                        user: mongoose.Types.ObjectId(userId),
                        commodity: mongoose.Types.ObjectId(data._id)
                    })
                    await userModel.update({_id:mongoose.Types.ObjectId(userId)},
                    {
                        $inc: {trace: 1}
                    })
                }
            }
                
        }
            
        res.json({
            code: 200,
            data
        })

    } catch(err) {
        next()
    }
}

module.exports = {
    addCommodity,
    getAllCommodity,
    getCommodityById
}