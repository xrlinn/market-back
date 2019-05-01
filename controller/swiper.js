const swiperModel = require('../model/swiper')
const mongoose = require('mongoose')

async function addSwiper (req,res,next) {
    try {
        const {img, commodityId, index=1} = req.body
        const swiper = await swiperModel.create({
            img,
            commodity: mongoose.Types.ObjectId(commodityId),
            index
        })
        res.json({
            code: 200,
            msg: '轮播图添加成功'
        })

    } catch (err) {
        next(err)
    }
}

async function getSwiper (req,res,next) {
    try {
        let {pn=1, size=3} = req.query
        pn = Number(pn);
        size = Number(size)
        const data = await swiperModel
        .find({status: 1})
        .populate({
            path: 'commodity'
        })
        .sort({index: -1, _id: -1})
        .skip((pn-1) *size)
        .limit(size)
        
        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}

async function updateSwiper (req,res,next) {
    try {
        const id = req.params.id // 取得轮播图id
        const {
            title,
            commodityId,
            status,
            index
        } = req.body;
        const updataData = await swiperModel.updateOne({
            _id: mongoose.Types.ObjectId(id)
        },{
            title,
            commodity: mongoose.Types.ObjectId(commodityId),
            status,
            index
        })

        res.json({
            code: 200,
            msg: '更新轮播图成功',
            data: updataData
        })

        
    } catch (err) {
        next(err)
    }
}

module.exports = {
    addSwiper,
    getSwiper,
    updateSwiper
}