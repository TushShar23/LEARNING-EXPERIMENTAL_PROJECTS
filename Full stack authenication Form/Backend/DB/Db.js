import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserSchema = new Schema({
    firstname: {type:String,required:true},
    lastname: {type:string,required:true},
    email: {type:string,unique:true,required:true},// primary key kinda
    password: {type:String,required:true},
    phone: {type:String,required:true,unique:true}
})

export const UserModel = mongoose.model('Users','UserSchema','Users');
