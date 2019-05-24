const validator = require('validator');
const userModel = require('../model/user')
const smsCodeModel = require('../model/smsCode')
const signUtil = require('../utils/signToken')
const mongoose = require('mongoose')

async function register (req,res,next) {
    try {
        const {phone, code, password} = req.body;
        const phoneStatus = validator.isMobilePhone(phone, "zh-CN")
        const passwordStatus = validator.isLength(password, {
            min: 6
          })
        if (phoneStatus && passwordStatus) { // 判断手机格式是否正确
            const user = await userModel.findOne({
                phone: phone
            })
            if (user) { // 判断账号是否被注册
                res.json({
                    code: 400,
                    msg: '该账号已被注册'
                })
            } else {
                const smsCode = await smsCodeModel.findOne({code}).sort({_id: -1})
                if (smsCode) { //判断是否发送验证码
                    const smsCodeDate = new Date(smsCode.updateTime)
                    const smsCodeTime = Math.round(smsCodeDate.getTime() / 1000)
                    const nowTime = Math.round(Date.now() / 1000)
                    if (nowTime - smsCodeTime <= 5*60) { // 判断验证码是否过期
                        if (code === smsCode.code) {
                            await userModel.create({
                                phone,
                                password
                            })
                            res.json({
                                code: 200,
                                msg: '注册成功'
                            })
                        } else {
                            res.json({
                                code: 400,
                                msg: '输入的验证码不正确'
                            })
                        }
                        

                    } else {
                        res.json({
                            code: 400,
                            msg: '验证码已过期'
                        })
                    }

                } else {
                    res.json({
                        code: 400,
                        msg: '验证码不正确'
                    })
                }
            }
        } else {
            res.json({
                code: 400,
                msg: '手机号码格式不正确'
            })
        }
    } catch (err) {
        next(err)
    }


}

async function login (req,res,next) {
    try {
        const {phone, password} = req.body;
        if (phone && password) {
            const user = await userModel.findOne({
                phone
            })
            if (user) {
                if (password === user.password) {
                    const token = signUtil({userId: user._id})
                    res.json({
                        code: 200,
                        data: {
                            token
                        }
                    })
                } else {
                    res.json({
                        code: 400,
                        msg: '输入的密码不正确'
                    })
                }

            } else {
                res.json({
                    code: 400,
                    msg: '该用户不存在'
                })
            }

        } else {
            res.json({
                code: 400,
                msg: '输入的参数不正确'
            })
        }

    } catch (err) {
        next(err)
    }
}

async function getUserById (req,res,next) {
    try {
        const userId = req.user.userId;
        const userData = await userModel.findOne(mongoose
.Types.ObjectId(userId)).select('-password')
        res.json({
            code: 200,
            data: userData
        })
    } catch (err) {
        next(err)
    }
}

async function changePassword (req,res,next) {
    try {
        const userId = req.user.userId
        const {password, changePassword} = req.body;
        
        const userData = await userModel.findById(mongoose
            .Types.ObjectId(userId))
        if (password == userData.password) {
            await userData.set({password: changePassword})
            await userData.save()

            res.json({
                code: 200,
                msg: '密码修改成功'
            })

        } else {
            res.json({
                code: 400,
                msg: '您输入的密码不正确'
            })
        }
    } catch (err) {
        next(err)
    }
}

async function changeUser (req,res,next) {
    try {
        const userId = req.user.userId;
        const {avatar , desc,  usernickname, address} = req.body;
        const userData = await userModel.findById(
            mongoose.Types.ObjectId(userId)
        )
        console.log(userData)
        if(avatar) {
            console.log(1)
            await userData.set({avatar})
            await userData.save()
            res.json({
                code: 200,
                msg: '修改图片信息成功'
            })
        } else if (desc) {
            await userData.set({desc})
            await userData.save()
            res.json({
                code: 200,
                msg: '修改描述信息成功'
            })
        } else if (usernickname) {
            await userData.set({usernickname})
            await userData.save()
            res.json({
                code: 200,
                msg: '修改昵称信息成功'
            })
        } else if (address) {
            await userData.set({address})
            await userData.save()
            res.json({
                code: 200,
                msg: '修改收货地址成功'
            })
        } else {
            res.json({
                code: 400,
                msg: '参数错误'
            })
        }    
    } catch (err) {
        next(err)
    }
}

module.exports = {
    register,
    login,
    getUserById,
    changePassword,
    changeUser
}