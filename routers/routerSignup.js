const express=require("express");
const {doSignup,doLogin}=require("../controllers/SignupCont");

const app=express.Router();

app.post("/signup",doSignup);
app.get('/login',doLogin);

module.exports=app;