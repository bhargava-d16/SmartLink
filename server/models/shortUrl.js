import mongoose, { Mongoose } from "mongoose";

const URLSchema=new mongoose.Schema({
       
       full_url:{
         type:String,
         required:true,
         unique:true,
       },
       short_url:{
         type:String,
         required:true,
         index:true,
         unique:true,
       },
       expiry:{
        type:String,
       },
       clicks:{
          type:Number,
          required:true,
          default:0,
       },
       createdAt: {
          type: Date,
          default: Date.now,
       },
       user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:"UserModel",
       },
      },{timestamps:true}
      )

const UrlModel=mongoose.model("urls",URLSchema);
export default UrlModel
