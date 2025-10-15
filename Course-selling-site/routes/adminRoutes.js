import express, { application } from "express"
import Router from "express"
import z from "zod"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { courseCreatorModel, courseModel } from "../Database/db.js"
import { adminMiddleware } from "../Middlewares/admin.js"
import dotenv from "dotenv"

dotenv.config()


const adminRouter = Router()

adminRouter.use(express.json())

// admin have signup,signin,createcourse,updatecourse,getcourses

adminRouter.post('/signup',async(req,res)=>{
    const reqbody = z.object({
        email: z.string().min(10).max(50),
        password: z.string().min(6).max(50),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })

    const parsedBody = reqbody.safeParse(req.body)

    if(!parsedBody){
        res.json({
            message:"Incorrect format",
            Error:parsedBody.error
        })
    }
    else{
        const email = req.body.email
        const password = req.body.password
        const firstName = req.body.firstName
        const lastName = req.body.lastName

        const hashpass = await bcrypt.hash(password,5)

        try {
            await courseCreatorModel.insertOne({
                email: email,
                password: hashpass,
                firstName: firstName,
                lastName: lastName
            })

            res.json({
                message:"User Signed Up successfully!"
            })
        } catch (error) {
            res.json({
                message:"Error occured while inserting data into DB!"
            })
        }
    }

    
})

adminRouter.post('/signin',async(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    const userFound = await courseCreatorModel.findOne({
        email: email
    })

    if(userFound){
        const passMatch = await bcrypt.compare(password,userFound.password)

        if(passMatch){
            const token = jwt.sign({
                // id is our variable
                id: userFound._id.toString()
            },process.env.JWT_SECRET_admin)

            res.json({
                token: token
            })
        }
        else{
            res.json({
                message:"Password does not match"
            })
        }
    }
    else{
        res.status(403).json({
            message:"User does not exist in our DB"
        })
        return
    }
})

adminRouter.post('/course',adminMiddleware,async(req,res)=>{
    // create a course
    const adminId = req.adminId;
    const { title,description,price,imageURL,creatorID } = req.body;
    
    const course = await courseModel.insertOne({
        title: title,
        description: description,
        price: price,
        imageURL: imageURL,
        creatorID: adminId
    })

    res.json({
        message:"Course created !",
        courseId: course._id
    })
    
    // res.send({
    //     message:"/admin/course create a course endpoint"
    // })
})

adminRouter.put("/course",adminMiddleware,async(req,res)=>{
    // update a course
    const adminId = req.adminId;
    const {newtitle,newdescription,newprice,newimageURL,courseId} = req.body;

    await courseModel.updateOne({
        creatorID: adminId,
        _id: courseId // we are searching in courseModel so it has objectId property denoted by "_id" 

        // See the big thing is when we are updating the course we should know that IS THIS COURSE BELONG TO THAT USER OR NOT ? for this we are checking in filters parameters that creatorID should be adminID and _id should be courseID which has been given to us in the body."Simple si baat hai agar ye adminID wala check nhi lagaya hume pata hi nhi chalega ki konsa course kiska hai aur sab admins ek dusre ke courses ko change karte rahenge"
    },
    {
        title: newtitle,
        description: newdescription,
        price: newprice,
        imageURL: newimageURL
    })

    res.json({
        message:"Course updated successfully!"
    })
    
    // res.send({
    //     message:"/admin/course update a course endpoint"
    // })
})

adminRouter.get("/course/bulk",adminMiddleware,async(req,res)=>{
    // get all the courses
    const adminId = req.adminId
    const allCourses = await courseModel.find({
        creatorID: adminId
    })

    res.json({
        courses: allCourses
    })
})

export { adminRouter }