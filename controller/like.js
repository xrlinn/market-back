const likeModel = require('../model/like')
const mongoose = require('mongoose')
const userModel = require('../model/user')
const commodityModel = require('../model/commodity')

async function addLike (req,res,next) {
    try {
        const userId = req.user.userId
        const {commodityId} = req.body
        const like = await likeModel.findOne({
            user: mongoose.Types.ObjectId(userId),
            commodity: mongoose.Types.ObjectId(commodityId)
        })
        if (like) {
            res.json({
                code: 400,
                msg: '你已经点赞过了哦'
            })
        } else {
            await likeModel.create({
                user: mongoose.Types.ObjectId(userId),
                commodity: mongoose.Types.ObjectId(commodityId)
            })
            await userModel.update({_id:mongoose.Types.ObjectId(userId)},
            {
                $inc: {like: 1}
            })
            await commodityModel.update({_id:mongoose.Types.ObjectId(commodityId)},
            {
                $inc: {like: 1}
            })
            res.json({
                code: 200,
                msg: '点赞成功'
            })
        }

    } catch(err) {
        next(err)
    }
}

async function getLike (req,res,next) {
    try {
        const userId = req.user.userId
        let {pn=1,size=2} = req.query
        pn = Number(pn)
        size = Number(size)
        const data = await likeModel.find({
            user: mongoose.Types.ObjectId(userId)
        }).populate({
            path: 'commodity'
        }).sort({_id: -1})
        .skip((pn-1)*size)
        .limit(size)

        res.json({
            code: 200,
            data
        })

    } catch {
        next(err)
    }
}

async function deleteLike (req,res,next) {
    try {
        const userId = req.user.userId
        const {id} = req.params;
        const like = await likeModel.findById(mongoose.Types.ObjectId(id))
        if (like) {
            await like.remove()
            await like.save()
            await userModel.update({_id:mongoose.Types.ObjectId(userId)},
            {
                $inc: {like: -1}
            })
            res.json({
                code: 200,
                msg: '删除点赞成功'
            })
        } else {
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
    addLike,
    getLike,
    deleteLike
}