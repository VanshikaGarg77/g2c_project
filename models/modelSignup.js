const mongoose = require("mongoose");
const bcrypt=require("bcryptjs");

let signup = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
  },
  {
    versionKey: false,
  }
);

signup.pre("save",async function(next){
    const user=this;
    if(!user.isModified("password")){
       return next();
    }
    try
    {
    const saltRound=10;
    const hash_password=await bcrypt.hash(user.password,saltRound);
    user.password=hash_password;
    next();
    }
    catch(err)
    {
        next(err);
    }
})
const model = mongoose.model("signupModel", signup);

module.exports = model;
