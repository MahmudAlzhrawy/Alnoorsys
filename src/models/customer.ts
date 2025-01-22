import mongoose from "mongoose";
const customerSchema =new mongoose.Schema({
    status:{type:String,required:true},
    name:{type:String,required:true},
    frame:{type:String,required:true},
    lences:{type:String,required:true},
    price:{type:Number,required:true},
    phone:{type:String,required:true},
    code:{type:Number,required:true},
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now},
})
export const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);