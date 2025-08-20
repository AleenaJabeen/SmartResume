import { Schema } from "mongoose";
import mongoose from "mongoose";

const templateSchema=new Schema({
    template:{
        type:String,
        required:true
    },
    category:{
        type:String
        
    },
    html:{
        type:String,
        required:true
    }
},{timestamps:true})

export const Template=mongoose.model('Template',templateSchema)