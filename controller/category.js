const categoryModel = require('../model/category')
const commodityModel = require('../model/commodity')
const mongoose = require('mongoose')


async function addCategory (req,res,next) {
    try {
        const {title} = req.body;
        await categoryModel.create({
            title
        })

        res.json({
            code: 200,
            msg: '添加分类成功'
        })

    } catch (err) {
        next(err)
    }
}

async function getCategory (req,res,next) {
    try {
        const data = await categoryModel.find()
            .sort({_id: -1})
        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}

async function addCommodityToCategory (req,res,next) {
    try {
        const {categoryId, commodityId} = req.body;
        const category = await categoryModel.findOne({
            _id: mongoose.Types.ObjectId(categoryId)
        })
        const commodity = await commodityModel.findOne({
            _id: mongoose.Types.ObjectId(commodityId)
        })
        if (commodity) {
            await category.commodity.push(commodity._id)
            await category.save()
            res.json({
                code: 200,
                msg: '分类商品添加成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '添加的商品无效，该商品不存在'
            })
        }
        
    } catch (err) {
        next(err)
    }
}

async function getCommodityOfCategory (req,res,next) {
    try {
        let {pn=1, size=2, commoditySize=2} = req.query;
        pn = Number(pn)
        size = Number(size)
        commoditySize = Number(commoditySize)
        const data = await categoryModel.find()
            .sort({_id: -1})
            .populate({
                path: 'commodity', // commoditys自己定义骨架中的键名
                options: {limit: commoditySize}
            })
            .skip((pn-1) * size)
            .limit(size)
            .sort({_id: -1})

        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}

async function getCommodityByCategory (req,res,next) {
    try {
        const {id} = req.params
        let {pn, size} =  req.query
        pn = Number(pn)
        size = Number(size)
        const data = await categoryModel.findById(mongoose.Types.ObjectId(id))
                    .populate({
                        path: 'commodity',
                        options: {limit: size,skip:(pn-1)*size}
                    })                  
        res.json({
            code: 200,
            data
        })

    } catch (err) {
        next(err)
    }
}


module.exports = {
    addCategory,
    getCategory,
    addCommodityToCategory,
    getCommodityOfCategory,
    getCommodityByCategory
}