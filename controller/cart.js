const cartModel = require('../model/cart');
const mongoose = require('mongoose');
const userModel = require('../model/user')

async function addcart (req,res,next) {
    try {
        const userId = req.user.userId;
        const {commodityId} = req.body;
        // const cart = await cartModel.findOne({
        //     user: mongoose.Types.ObjectId(userId),
        //     commodity: mongoose.Types.ObjectId(commodityId)
        // })
    
        const cart = await cartModel.create({
            user: mongoose.Types.ObjectId(userId),
            commodity: mongoose.Types.ObjectId(commodityId)
        })
        await userModel.update({_id:mongoose.Types.ObjectId(userId)},
        {
            $inc: {cartnums: 1}
        })
        res.json({
            code: 200,
            msg: '添加成功，在购物车等亲！'
        })
        
    } catch (err) {
        next(err)
    }
}

async function getcart (req,res,next) {
    try {
        const Id = req.user.userId
        let {pn=1, size=4} = req.query;
        pn = Number(pn);
        size = Number(size);
        const data = await cartModel
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

async function deletecart (req,res,next) {
    try {
        const userId = req.user.userId
        const id = req.params.id
        const cart = await cartModel.findById(
            mongoose.Types.ObjectId(id)
        )
        if (cart) {
            await cart.remove()
            await cart.save()
            await userModel.update({_id:mongoose.Types.ObjectId(userId)},
            {
                $inc: {cartnums: -1}
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
    addcart,
    getcart,
    deletecart
}