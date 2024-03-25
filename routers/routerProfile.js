const express=require("express");
const {doSave, doUpdate, findOne}=require("../controllers/ProfileCont");

//its not a middleware-just testing the token from frontend
const validateToken=require("../middleware/validate-token");

//importing middleware
const validateTokenWithNext=require("../middleware/validate-token-with-next");

const app=express.Router();

app.post('/add-grower',doSave);
app.post('/update',doUpdate);
app.get('/fetch',findOne);

//************TOKEN Validation without next******* */
app.get("/token-validation",validateToken);

//token validation with next
app.get("/fetch-token",validateTokenWithNext,findOne);

module.exports=app;