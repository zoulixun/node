//login & register
const express = require("express");
const router = express.Router();
const Profile = require("../../models/Profile");    
const passport = require('passport');           //验证token

// $route  GET api/profiles
// @desc   获取所有信息
// @access Private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res) =>{
    Profile.find()
    .then( profile =>{
        if(!profile){
            return res.status(404).json("没有相关信息")
        }else{
            res.json(profile)
        }
    })
    .catch(err =>{
        return res.status(404).json(err);
    })
})

// $route  GET api/profiles
// @desc   获取单个信息
// @access Private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res) =>{
    Profile.findOne({_id:req.params.id})
    .then( profile =>{
        if(!profile){
            return res.status(404).json("没有相关信息")
        }else{
            res.json(profile)
        }
    })
    .catch(err =>{
        return res.status(404).json(err);
    })
})

// $route  POST api/profiles/add
// @desc   添加信息
// @access Private

router.post("/add",passport.authenticate("jwt",{session:false}),(req,res) =>{
    const profileFields = {};
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    new Profile(profileFields).save()
    .then(profile =>{
        res.json(profile);
    })
    .catch(err =>{
        console.log(err);
    })
    
})

// $route  POST api/profiles/edit
// @desc   编辑信息
// @access public
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res) =>{
    const profileFields = {};
    if(req.body.type) profileFields.type = req.body.type;
    if(req.body.describe) profileFields.describe = req.body.describe;
    if(req.body.income) profileFields.income = req.body.income;
    if(req.body.expend) profileFields.expend = req.body.expend;
    if(req.body.cash) profileFields.cash = req.body.cash;
    if(req.body.remark) profileFields.remark = req.body.remark;

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profileFields},
        {new:true}       
    )
    .then(profile =>{
        res.json(profile)
    })
    .catch(err =>{
        res.json(err)
    })
})

// $route  POST api/profiles/delete
// @desc   删除信息
// @access Private
router.post("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res) =>{
    Profile.findOneAndRemove({_id:req.params.id})
    .then(profile =>{
        profile.save()
        .then(profile =>{
            res.json(profile);
        })
        .catch(err =>{
            res.status(404).json("删除失败");
        })  

    })
})














// $route  GET api/profiles/test
// @desc   测试用接口
// @access public
router.get("/test",(req,res) =>{
    res.json({
        msg:"profile works"
    })
})


module.exports = router;
