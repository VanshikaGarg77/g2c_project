const mongoose=require('mongoose');

    let profile=new mongoose.Schema({
        email:{type:String,required:true,unique:true},
        fname:String,
        lname:String,
        address:String,
        village:String,
        mobile:Number,
        city:String,
        aadhar:Number,
        ppic:String
    },
    {
        versionKey:false
    })

const ProfileModel=mongoose.model("ProfileCollection",profile);

module.exports=ProfileModel;
