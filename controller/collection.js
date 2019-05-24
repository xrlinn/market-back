const collectionModel = require('../model/collection');
const mongoose = require('mongoose');
const userModel = require('../model/user')

async function addCollection (req,res,next) {
    try {
        const userId = req.user.userId;
        const {commodityId} = req.body;
        const collection = await collectionModel.findOne({
            user: mongoose.Types.ObjectId(userId),
            commodity: mongoose.Types.ObjectId(commodityId)
        })
        if (collection) {
            res.json({
                code: 400,
                msg: '对不起，您已经收藏过了哦'
            })
        } else {
            const collection = await collectionModel.create({
                user: mongoose.Types.ObjectId(userId),
                commodity: mongoose.Types.ObjectId(commodityId)
            })
            await userModel.update({_id:mongoose.Types.ObjectId(userId)},
            {
                $inc: {collected: 1}
            })
            res.json({
                code: 200,
                msg: '添加收藏成功'
            })
        }
   

    } catch (err) {
        next(err)
    }
}

async function getCollection (req,res,next) {
    try {
        const Id = req.user.userId
        let {pn=1, size=1} = req.query;
        pn = Number(pn);
        size = Number(size);
        const data = await collectionModel
        .find({
            user: mongoose.Types.ObjectId(Id),
        })
        .populate({
            path: 'commodity'
        })
        .sort({_id: -1})
        .skip((pn-1) * size)
        .limit(size)

        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}

async function deleteCollection (req,res,next) {
    try {
        const userId = req.user.userId
        const id = req.params.id
        const collection = await collectionModel.findById(
            mongoose.Types.ObjectId(id)
        )
        if (collection) {
            await collection.remove()
            await collection.save()
            await userModel.update({_id:mongoose.Types.ObjectId(userId)},
            {
                $inc: {collected: -1}
            })
            res.json({
                code: 200,
                msg: '删除收藏成功'
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
    addCollection,
    getCollection,
    deleteCollection
}