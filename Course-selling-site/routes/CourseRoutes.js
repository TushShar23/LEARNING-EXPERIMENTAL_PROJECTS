import express from "express"
import Router from "express"
import { courseUserModel,purchaseModel,courseModel } from "../Database/db.js";
import { userMiddleware } from "../Middlewares/user.js";


const CourseRouter = Router();

CourseRouter.use(express.json())

CourseRouter.post("/purchase",userMiddleware,async(req,res)=>{
    // user comes to this route for purchasing any course.
    const Uid = req.userId; // coz we have populated the req object with userId property
    const courseId = req.body.courseId;
    // we have created a purchase table where we are storing the user and course mapping which user has bought which course.

    // you should add here the checks here razorpay and all for checking whether user has paid the required amount or not ?

    const coursePurchased = await purchaseModel.insertOne({
        userID: Uid,
        courseID: courseId
    })

    
    res.send({
        message:"Course purchased successfully!"
    })
})

CourseRouter.get('/preview',async(req,res)=>{
    // shows all the available courses on the site
    // whether user/admin is signed up or not our site should preview all the courses available.
    const courses = await courseModel.find({}) // empty brackets means show all the courses.No filter


    res.send({
        courses
    })
})

export { CourseRouter }
// intentionally i've used commonjs syntax here.