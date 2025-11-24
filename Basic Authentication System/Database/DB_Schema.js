import mongoose from 'mongoose';
import { Schema  } from 'mongoose';


// First we need to design the schema 
// Ok there will be admins and users
// Registration will be done using password,email,username

const User = new Schema({
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    password:{type:String,unique:true},
})

const Admin = new Schema({
    adminID:{type:Number},
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    password:{type:String,unique:true}
})

const UserModel = mongoose.model('simpleAuthUsers',User,'simpleAuthUsers');
const AdminModel = mongoose.model('simpleAuthAdmins',Admin,'simpleAuthAdmins');

export {UserModel,AdminModel};

// module.exports={
//     UserModel:UserModel,
//     AdminModel:AdminModel
// }