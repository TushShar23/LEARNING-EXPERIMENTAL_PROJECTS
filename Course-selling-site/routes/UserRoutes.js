import express from "express"
import Router from "express"
import { courseUserModel } from "../Database/db.js"
import z from "zod"
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"

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

UserRouter.get("/purchases",(req,res)=>{
    // shows the purchased courses
    res.send({
        message:"/user/purchases endpoint"
    })
})

export { UserRouter }