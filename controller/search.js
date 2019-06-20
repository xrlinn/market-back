const commodityModel = require('../model/commodity')
const categoryModel = require("../model/category")
const mongoose = require('mongoose')

async function getSearch(req,res,next) {
    try {
        const {title} = req.body
        console.log(title)
        const categoryData = await categoryModel
                            .findOne({title})
                            .populate({
                                path: 'commodity'
                            })
        const commoditData = await commodityModel
                            .find({title:{$regex: title, $options:'i'}})
        console.log(commoditData);
        if (categoryData) {
            res.json({
                code:200,
                data: categoryData
            })
            // next()
        }else if (commoditData.length > 0) {
            res.json({
                code:201,
                data: commoditData
            })
        }else {
            res.json({
                code: 404,
                msg: '搜索的商品不存在'
            })
        } 
    } catch (err) {
        next(err)
    }
}

module.exports = {
    getSearch
}