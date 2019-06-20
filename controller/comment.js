const commentModel = require('../model/comment')
const mongoose = require('mongoose')
const commodityModel = require('../model/commodity')

async function addCommentToCommodity (req,res,next) {
    try {
        const userId = req.user.userId
        const {text, url,commodityId} = req.body
        console.log(commodityId)
        const comment = await commentModel.create({
            user: mongoose.Types.ObjectId(userId),
            text,
            img: url
        })
        const commodity = await commodityModel.findById(
            mongoose.Types.ObjectId(commodityId)
        )
        if (commodity) {
            await commodity.comment.push(comment._id)
            await commodity.save()
            res.json({
                code: 200,
                msg: '发表评价成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '该商品不存在'
            })
        }
    } catch(err) {
        next (err)
    }
}

module.exports = {
    addCommentToCommodity
}