import Router from 'express';
import dotenv from 'dotenv';
import z from 'zod';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { AdminModel } from '../Database/DB_Schema.js';

dotenv.config();

const adminRouter = Router();


adminRouter.post('/signup',async(req,res)=>{
    const reqBody = z.object({
        adminID: z.number(),
        email: z.string().min(10).max(30),
        username: z.string().min(4).max(30),
        password: z.string().min(6).max(30),
    })

    const parseBody = reqBody.safeParse(req.body)

    if(!parseBody.success){
        res.json({
            message: "Invalid format",
            error: parseBody.error
        })
    }
    else{
        const {adminID,email,username,password} = req.body;

        const hashPass = await bcrypt.hash(password,5);

        try {
            await AdminModel.insertOne({
                adminID: adminID,
                email: email,
                username: username,
                password: hashPass
            })

            res.json({
                message:"User signed up successfully!"
            })
        } catch (error) {
            res.json({
                error: `Error while inserting Data: ${error}`
            })
        }

    }


})


adminRouter.post('/signin',async(req,res)=>{
    const adminID = req.body.adminID;
    const email = req.body.email;
    const password = req.body.password;

    const userFound = await AdminModel.findOne({
        adminID: adminID,
        email: email
    })

    if(!userFound){
        res.json({
            message: "User does not exist in our DB!"
        })
    }
    else{
        const passMatch = bcrypt.compare(password,userFound.password);
        
        if(passMatch){
            const token = jwt.sign({
                id: userFound._id.toString()
            },process.env.JWT_ADMIN)

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



export default adminRouter;