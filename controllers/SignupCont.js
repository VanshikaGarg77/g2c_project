const {getModelSignup}=require("../models/modelSignup");
const modelSignup=getModelSignup();
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken");

function doSignup(req,res)
{
    console.log(req.body);
    const doc = new modelSignup(req.body);
    doc
      .save()
      .then((retDoc) => {
        res.set("json");
        res.json({ status: true, rec: retDoc,type:req.body.type }); //retDoc is an object
      })
      .catch((err) => {
        res.json({ status: false, err: err.message });
      });
}

function doLogin(req,res)
{
  modelSignup.findOne({email:req.query.email})
  .then((result)=>{
    if(result)
    {
      if(result.password===req.query.password)
     {
      //creation of webtoken==================
      let skey=process.env.SEC_KEY;
      let token=jwt.sign({result},skey,{expiresIn:"1m"});

      res.json({status:true,msg:"Login successful",type:result.type,jtoken:token})
     }
      else
      res.json({status:true,msg:"Incorrect password"})
    }
    else
    res.json({status:true,msg:"User doesn't exist"})
  })
  .catch((err)=>{
    res.json({ status: false,err:err.message });
  })
}
module.exports={doSignup,doLogin};