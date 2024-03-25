const mongoose=require('mongoose');

function getModelSignup()
{
    let signup=new mongoose.Schema({
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        type:{type:String,required:true}
    },{
        versionKey:false
    })
    const model=mongoose.model("signupModel",signup);
    return model;
}
module.exports={getModelSignup};