import express from "express"
import Router from "express"
import { courseUserModel } from "../Database/db.js";

const CourseRouter = Router();

CourseRouter.post("/purchase",(req,res)=>{
    // user comes to this route for purchasing any course.
    res.send({
        message:"/course/purchase endpoint"
    })
})

CourseRouter.get('/preview',(req,res)=>{
    // shows all the available courses on the site
    res.send({
        message:"/course/preview endpoint"
    })
})

export { CourseRouter }
// intentionally i've used commonjs syntax here.