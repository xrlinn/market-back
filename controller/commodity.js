const commodityModel = require('../model/commodity')
const mongoose = require('mongoose')

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
        const {id} = req.params
        const data = await commodityModel.findById(id)
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