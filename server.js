const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb+srv://zoulixun:zlb*963.@cluster0-kcs6b.mongodb.net/test?retryWrites=true&w=majority")
.then(() =>{
    console.log("ok");
})
.catch(err =>{
    console.log(err);
})

app.get("/",(req,res) =>{
    res.send("hello world");
})

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})