//login & register
const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");               //密码加密包
const jwt = require('jsonwebtoken');            //生成token
const keys = require("../../config/keys");      
const passport = require('passport');           //验证token


// $route  GET api/users/test
// @desc   返回请求的json数据
// @access public
router.get("/test",(req,res) =>{
    res.json({
        msg:"login works"
    })
})

// $route  POST api/users/register
// @desc   返回请求的json数据
// @access public
router.post("/register",(req,res) =>{
    //console.log(res.body);
    //查询数据库中是否拥有邮箱
    User.findOne({email:req.body.email})
    .then((user) =>{
        if(user){
            return res.status(400).json("邮箱已被占用")
        }else{
            const newUser = new User({
                name:req.body.name,
                email:req.body.email,              
                password:req.body.password,
                identity:req.body.identity
            });
            //密码加密
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                           .then(user =>{
                               res.json(user);
                           })
                           .catch(err =>{
                               console.log(err);
                           })
                });
            });

        }
    })
})

// $route  POST api/users/login
// @desc   返回token jwt passport
// @access public
router.post("/login",(req,res) =>{
    const email = req.body.email;
    const password = req.body.password;
    //查询数据库
    User.findOne({email:email})
        .then(user =>{
            if(!user){
                return res.status(404).json("用户不存在")
            }
            //密码匹配
            bcrypt.compare(password, user.password)
                // res == true
                .then(isMatch =>{
                    if(isMatch){
                       // res.json({msg:"success"})
                       const rule = {
                           id:user.id,
                           name:user.name,
                           identity:user.identity
                        };
                       jwt.sign(rule,keys.secretOrKey,{expiresIn:3600},(err,token) =>{
                           if(err) throw err;
                           res.json({
                               success:true,
                               token:"Bearer " + token
                           })
                       })
                    }else{
                        return res.status(400).json("密码错误")
                    }
                })
            });
        })

        // $route  GET api/users/current
        // @desc   return current user
        // @access Private
        router.get("/current",passport.authenticate("jwt",{session:false}),(req,res) =>{
            //res.json(req.user);
            res.json({
                id:req.user.id,
                name:req.user.name,
                email:req.user.email,
                identity:req.user.identity
            })
        })

module.exports = router;
