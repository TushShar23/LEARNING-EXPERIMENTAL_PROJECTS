import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    Firstname: {type:String,required:true},
    Lastname: {type:string,required:true},
    Email: {type:string,unique:true,required:true},// primary key kinda
    Password: {type:String,required:true},
    Phone: {type:String,required:true,unique:true}
})

export const UserModel = mongoose.model('Users','UserSchema','Users');
