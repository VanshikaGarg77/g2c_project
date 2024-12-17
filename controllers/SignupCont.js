// const {getModelSignup}=require("../models/modelSignup");
// const modelSignup=getModelSignup();
const modelSignup=require("../models/modelSignup");
const dotenv=require("dotenv");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

async function doSignup(req,res)
{
    console.log(req.body);

    // const saltRound=10;
    // const hash_password=await bcrypt.hash(req.body.password,saltRound);
    // req.body.password=hash_password;

    const doc = new modelSignup(req.body);
    doc.save()
      .then((retDoc) => {
        res.set("json");
        res.json({ status: true, rec: retDoc,type:req.body.type }); //retDoc is an object
      })
      .catch((err) => {
        res.json({ status: false, err: err.message });
      });
}

async function doLogin(req,res)
{
  console.log(req.query);
  try {
    const result = await modelSignup.findOne({ email: req.query.email });
    if (result) {
      const match = await bcrypt.compare(req.query.password, result.password); // Use await here
      if (match) {
        // Creation of web token
        const skey = process.env.SEC_KEY;
        const token = jwt.sign({ result }, skey, { expiresIn: "30m" });

        res.json({ status: true, msg: "Login successful", type: result.type, jtoken: token });
      } else {
        res.json({ status: true, msg: "Incorrect password" });
      }
    } else {
      res.json({ status: true, msg: "User doesn't exist" });
    }
  } catch (err) {
    res.json({ status: false, err: err.message });
  }
}
module.exports={doSignup,doLogin};