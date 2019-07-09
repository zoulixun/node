const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");                    //用来解析post请求
const passport = require("passport");       
const app = express();
const users = require("./routers/api/users");
const profiles = require("./routers/api/profiles");
const db = require("./config/keys").mongoURI;

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

mongoose.connect(db,{ useNewUrlParser: true })
.then(() =>{
    console.log("mongodb is connected successfuly");
})
.catch(err =>{
    console.log(err);
})

app.use(passport.initialize());

require("./config/passport")(passport);


// app.get("/",(req,res) =>{
//     res.send("hello world");
// })

//使用routers
app.use("/api/users/",users);
app.use("/api/profiles/",profiles);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`Server running on port ${port}`)
})