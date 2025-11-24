import mongoose from 'mongoose';
import { Schema  } from 'mongoose';


// First we need to design the schema 
// Ok there will be admins and users
// Registration will be done using password,email,username

const User = new Schema({
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    password:{type:String,unique:true},
    age:{type:Number}
})

const Admin = new Schema({
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    password:{type:String,unique:true}
})

const UserModel = mongoose.model('Users-Data',User,'Users-Data');
const AdminModel = mongoose.model('Admins-Data',Admin,'Admins-Data');

export {UserModel,AdminModel};

// module.exports={
//     UserModel:UserModel,
//     AdminModel:AdminModel
// }