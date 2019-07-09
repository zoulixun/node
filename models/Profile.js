const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create Schema
const ProfileSchema = new Schema({
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    date:{
        type:String,
        default:Date.now
    },
    remark:{
        type:String,
    }
})

module.exports = User = mongoose.model("profile",ProfileSchema);                  //"users"代表芒果数据库中的表名，可以在此自定义，如果定义一个新的名字（数据库中不存在），则相当于在芒果数据库中新建了一个表，如果芒果中已存在该名，则是要访问该表