import mongoose, { Schema } from "mongoose";

const CourseUserSchema = new Schema({
    email: {type:String,unique:true},
    password: String,
    firstName: String,
    lastName: String
})

const CourseCreatorSchema = new Schema({
    email: {type:String,unique:true},
    password: String,
    firstName: String,
    lastName: String,
})

const CourseSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    imageURL: String,
    creatorID: Schema.Types.ObjectId // which creator/admin has designed this course
})

const PurchasesSchema = new Schema({
    userID: {type:Schema.Types.ObjectId, ref:"courseUsers"},
    courseID: {type:Schema.Types.ObjectId,ref:"courses"}
})


const courseUserModel = mongoose.model('courseUsers',CourseUserSchema,'courseUsers');
const courseCreatorModel = mongoose.model('courseCreators',CourseCreatorSchema,'courseCreators');
const courseModel = mongoose.model('courses',CourseSchema,'courses');
const purchaseModel = mongoose.model('purchases',PurchasesSchema,'purchases');


export { courseUserModel,courseCreatorModel,courseModel,purchaseModel }