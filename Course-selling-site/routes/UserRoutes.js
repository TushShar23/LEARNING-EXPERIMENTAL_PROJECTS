import express from "express"
import Router from "express"
import { courseModel, courseUserModel, purchaseModel } from "../Database/db.js"
import z from "zod"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { userMiddleware } from "../Middlewares/user.js"

dotenv.config();


const UserRouter = Router()

UserRouter.use(express.json())

UserRouter.post("/signup",async(req,res)=>{
    const reqbody = z.object({
        email: z.string().min(10).max(80),
        password: z.string().min(6).max(50),
        firstName: z.string().min(3).max(100),
        lastName: z.string().min(3).max(100)
    })
    
    const parseBody = reqbody.safeParse(req.body);

    if(!parseBody.success){
        res.json({
            message:"Incorrect format",
            error: parseBody.error
        })
    }
    else{
        const {email,password,firstName,lastName} = req.body;
        
        const hashpass = await bcrypt.hash(password,5)

        try {
            await courseUserModel.insertOne({
                email: email,
                password: hashpass,
                firstName: firstName,
                lastName: lastName
            })
            res.json({
                message:"User SignedUp successfully!"
            })
        } catch (error) {
            res.json({
                message:`Error occured : ${error}`
            })
        }
        
    }
})

UserRouter.post("/signin",async(req,res)=>{
    const {email,password} = req.body;

    const userFound = await courseUserModel.findOne({
        email: email
    })

    if(!userFound){
        res.json({
            message:"User does not exist in our DB!"
        })
    }
    else{
        const passMatch = await bcrypt.compare(password,userFound.password)

        if(passMatch){
            const token = jwt.sign({
                id: userFound._id.toString()
            },process.env.JWT_SECRET)

            res.json({
                token: token
            })
        }
        else{
            res.json({
                message:"Incorrect Credentials"
            })
        }
    }
})

UserRouter.get("/purchases",userMiddleware,async(req,res)=>{
    const Uid = req.userId;
    
    const purchases = await purchaseModel.find({
        userID: Uid
    }).populate("courseID")
    // This purchased returns you an object with only ids not any info about course so for that we need to do another operations.

    // const purchasedCourses = [];
    
    // for(let i=0;i<purchases.length;i++){
    //     purchasedCourses.push(purchases[i].courseID)
    // }

    // const courses = await courseModel.find({
    //     _id: { $in:purchasedCourses }
    // })
    
    // what we have done here is that first we fetch the purchases of the user using its ID then we are storing the courseIDs of all the purchases in the purchasedCourses array using loop and then we passed the 
    res.send({
        // purchasedCourses,
        // courses
        purchases
    })
})


// for purchasing a course we have added that route in the courseroutes

export { UserRouter }