import express from 'express';
import Router from 'express';
import bcrypt from 'bcrypt';
import z from 'zod'
import dotenv from 'dotenv';
import {UserModel} from '../Database/DB_Schema.js'
import jwt from 'jsonwebtoken'

dotenv.config();

const userRouter = Router();

userRouter.use(express.json())

// user will register,login and see its data.post,post and get,in get request where users wants to see its info we need MIDDLEWARE that can verify/authenticate user

userRouter.post('/signup',async(req,res)=>{
    const reqBody = z.object({
        email: z.string().min(10).max(50),
        username: z.string().min(4).max(30),
        password: z.string().min(6).max(60)
    })
    
    const ParseBody = reqBody.safeParse(req.body);

    // we have added validation for the data we have receive and then parsed that data.If the data is validated correctly then i

    if(!ParseBody.success){
        res.json({
            message:"Incorrect Format",
            error:ParseBody.error
        })
    }
    else{
        const email = req.body.email;
        const username = req.body.username;
        const password = req.body.password;

        const hashPass = await bcrypt.hash(password,5);

        try {
            await UserModel.insertOne({
                email: email,
                username: username,
                password: hashPass
            })

            res.json({
                message:"User signed up successfully!"
            })
            
        } catch (error) {
            res.json({
                message:`Error occured while inserting data,${error}`
            })
        }
    }
    


})



userRouter.post('/signin',async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    const UserFound = await UserModel.findOne({
        email: email
    })

    if(!UserFound){
        res.json({
            message:"No user found.User does not exist in our DB!"
        })
    }
    else{
        const passMatch = bcrypt.compare(password,UserFound.password);
        
        if(passMatch){
            const token = jwt.sign({
                id: UserFound._id.toString()
            },process.env.JWT_SECRET)

            res.json({
                token: token
            })
        }
        else{
            res.json({
                message:"Invalid credentials"
            })
        }
    }
})


export default userRouter;