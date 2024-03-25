const mongoose=require('mongoose');
const express=require('express');
const cors=require("cors");
var bodyparser=require("body-parser");
const fileUploader=require("express-fileupload");
const {dbUrl}=require("./config/dbconfig")
const routerProfile=require("./routers/routerProfile");
const routerSignup=require("./routers/routerSignup");
const routerAvail=require("./routers/routerAvail");
const dotenv=require("dotenv");

const app=express();
app.use(cors()); //Cross-origin resource sharing
app.use(bodyparser.json());//for parsing POST data coming from Client

dotenv.config();

app.use('/uploads',express.static('uploads'));
const port=2006;
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
})

const server=dbUrl;
mongoose.connect(server).then(()=>{
    console.log("connected successfully...");
}).catch(function(err){
    console.log(err);
})

app.use(express.urlencoded(true));
app.use(fileUploader());
app.use("/profile",routerProfile);
app.use('/signup',routerSignup);
app.use('/avail',routerAvail);