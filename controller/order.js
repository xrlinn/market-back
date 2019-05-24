const orderModel = require('../model/order')
const mongoose = require('mongoose')

async function AddOrder (req,res,next) {
    try {
        const userId = req.user.userId
        const {arr,status=1} = req.body
        const arr1 = JSON.parse(arr)
        console.log(arr1);
        const order = await orderModel.create({
            user: mongoose.Types.ObjectId(userId),
            status
        })
        if (order) {
            for (let i=0; i<arr1.length; i++) {
                await order.commodity.push(arr1[i])
                await order.save()
            }
            res.json({
                code: 200,
                msg: '订单提交成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '该订单不存在'
            })
        }

    } catch (err) {
        next(err)
    }
}

async function getAllOrder (req,res,next) {
    try {
        let {pn, size} = req.query;
        pn = Number(pn);
        size = Number(size);
        const data = await orderModel.find()
        .populate({
            path: 'user'
        })
        .populate({
            path: 'commodity.id'
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

async function getOrder1 (req,res,next) {
    try {
        let {pn, size} = req.query;
        pn = Number(pn);
        size = Number(size);
        const data = await orderModel.find({status:1})
        .populate({
            path: 'user'
        })
        .populate({
            path: 'commodity.id'
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
async function getOrder2 (req,res,next) {
    try {
        let {pn, size} = req.query;
        pn = Number(pn);
        size = Number(size);
        const data = await orderModel.find({status:2})
        .populate({
            path: 'user'
        })
        .populate({
            path: 'commodity.id'
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
async function getOrder3 (req,res,next) {
    try {
        let {pn, size} = req.query;
        pn = Number(pn);
        size = Number(size);
        const data = await orderModel.find({status:3})
        .populate({
            path: 'user'
        })
        .populate({
            path: 'commodity.id'
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
async function getOrder4 (req,res,next) {
    try {
        let {pn, size} = req.query;
        pn = Number(pn);
        size = Number(size);
        const data = await orderModel.find({status:4})
        .populate({
            path: 'user'
        })
        .populate({
            path: 'commodity.id'
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

async function deleteOrderById (req,res,next) {
    try {
        const {id} = req.params
        const order = await orderModel.findById(
            mongoose.Types.ObjectId(id)
        )
        if (order) {
            await order.remove()
            await order.save()
            res.json({
                code: 200,
                msg: '订单删除成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '该订单不存在或已删除'
            })
        }
    } catch (err) {
        next(err)
    }
}

async function changeOrderStatus (req,res,next) {
    try {
        const {id} = req.params
        const {status} = req.body
        const order= await orderModel.findById(mongoose
            .Types.ObjectId(id))
        if (order) {
            await order.set({status})
            await order.save()
            res.json({
                code: 200,
                data: order
            })
        }
    } catch (err) {
        next(err)
    }
}

module.exports = {
    AddOrder,
    getAllOrder,
    getOrder1,
    getOrder2,
    getOrder3,
    getOrder4,
    deleteOrderById,
    changeOrderStatus
}
