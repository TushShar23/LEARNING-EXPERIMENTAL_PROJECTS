// User is admin too so for now for this project only no need to define admin exclusively.

// signup route , signin route( which requires a middleware)

import { Router } from "express"
import express from "express"
import { UserModel } from "../DB/Db"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import z from "zod"

dotenv.config()

const UserRouter = Router()

UserRouter.use(express.json())

UserRouter.post('/signup',async(req,res)=>{
    const reqbody = z.object({
        firstname: z.string().min(3).max(50),
        lastname: z.string().min(3).max(50),
        email: z.email().min(15).max(100),// z.string().email is deprecated but z.email() is not
        password: z.string().min(8).max(50),
        phone:z.nu
    })
    const {firstname,lastname,email,password,phone} = req.body


})