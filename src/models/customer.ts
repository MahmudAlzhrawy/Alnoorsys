import mongoose from "mongoose";
const customerSchema =new mongoose.Schema({
    status:{type:String,required:true},
    name:{type:String,required:true},
    frame:{type:String,required:true},
    lences:{type:String,required:true},
    price:{type:Number,required:true},
    phone:{type:String,required:true},
    code:{type:Number,required:true},
    totalPrice:{type:Number,required:true},
    remainPrice:{type:Number,required:true},
    created_at:{type:Date,default:Date.now},
    updated_at:{type:Date,default:Date.now},
})
export const Client = mongoose.models.Client || mongoose.model('Client', customerSchema);