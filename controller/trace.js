const traceModel = require('../model/trace')
const userModel = require('../model/user')
const mongoose = require('mongoose')

async function getTrace (req,res,next) {
    try {
        let {pn,size} = req.body
        pn = Number(pn)
        size = Number(size)
        const userId = req.user.userId
        const traceData = await traceModel.find({
            user: mongoose.Types.ObjectId(userId)
        })
        .populate('commodity')
        .skip((pn-1)*size)
        .limit(size)
        .sort({_id:-1})
        res.json({
            code: 200,
            data: traceData
        })

    } catch (err) {
        next()
    }
}

async function deleteTrace (req,res,next) {
    try {
        const userId = req.user.userId
        const id = req.params.id
        const trace = await traceModel.findById(
            mongoose.Types.ObjectId(id)
        )
        if (trace) {
            await trace.remove()
            await trace.save()
            await userModel.update({_id:mongoose.Types.ObjectId(userId)},
            {
                $inc: {trace: -1}
            })
            res.json({
                code: 200,
                msg: '删除足迹成功'
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
    getTrace,
    deleteTrace
}
