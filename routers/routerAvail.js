const express=require("express");
const {doSave,addItem,doUpdate, fetchItem,findGrower,contact}=require("../controllers/AvailCont");

const app=express.Router();

app.post('/avail-product',doSave);
app.get("/fetch",addItem);
app.get("/update",doUpdate);
app.get("/fetch-item",fetchItem);
app.get("/find-grower",findGrower);
app.get("/contact-grower",contact)

module.exports=app;