const commodityModel = require('../model/commodity')
const categoryModel = require('../model/category')
const swiperModel = require('../model/swiper')
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
async function addCommodityToCategory(req, res, next) {
    try {
        const {img,title,price,delivery,categoryTitle} = req.body
        const categoryData = await categoryModel.findOne({
            title: categoryTitle
        })
        if (img&&title&&price&&delivery&&categoryTitle) {
            const commodity = await commodityModel.create({
                img,
                title,
                price,
                delivery
            })
            await categoryData.commodity.push(commodity._id)
            await categoryData.save()
            res.json({
                code: 200,
                msg: '商品发布成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '请填入完整的商品信息！'
            })
        }

    } catch (err) {
        next ()
    }
}



async function getAllCommodity (req,res,next) {
    try {
        let {pn, size} = req.query
        pn = Number(pn)
        size = Number(size)
        const data = await commodityModel.find()
                    .skip((pn-1)*size)
                    .limit(size)
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
                    .populate({
                        path: 'comment',
                        options: {populate: 'user'}
                    })
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

async function deleteCommodity (req, res, next) {
    try{
        const {id} = req.params
        const commodityData = await commodityModel.findById(id)
        const categoryData = await categoryModel.findOne({
            commodity:mongoose.Types.ObjectId(id)
        })
        const swiperData = await swiperModel.findOne({
            commodity:mongoose.Types.ObjectId(id)
        })
        await categoryData.commodity.splice(categoryData.commodity.findIndex(item => 
            item === id
        ), 1)
        await categoryData.save()
        await swiperData.remove()
        await swiperData.save()
        if (commodityData) {
            await commodityData.remove()
            await commodityData.save()
            res.json({
                code: 200,
                msg: '该商品下架成功'
            })
        }else {
            res.json({
                code: 400,
                msg: '该商品不存在或已删除'
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addCommodity,
    getAllCommodity,
    getCommodityById,
    deleteCommodity,
    addCommodityToCategory
}