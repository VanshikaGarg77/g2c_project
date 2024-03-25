const mongoose=require('mongoose');

function getModelAvail()
{
    let avail=new mongoose.Schema({
        email:{type:String,required:true},
        category:{type:String,required:true},
        items:{type:String,required:true},
        ppic:String,
        city:String
    },
    {
        versionKey:false
    })
    const AvailModel=mongoose.model("AvailProduct",avail);
    return AvailModel;
}

module.exports={getModelAvail};