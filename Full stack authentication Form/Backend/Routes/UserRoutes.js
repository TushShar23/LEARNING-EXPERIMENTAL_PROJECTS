// User is admin too so for now for this project only no need to define admin exclusively.

// signup route , signin route( which requires a middleware)

import { Router } from "express"
import express from "express"
import { UserModel } from "../DB/Db.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import z from "zod"
import v from "validator"

dotenv.config()

const UserRouter = Router()

UserRouter.use(express.json())

UserRouter.post('/signup',async(req,res)=>{
    //validation using zod,validator.js
    const reqbody = z.object({
        firstname: z.string().min(3).max(50),
        lastname: z.string().min(3).max(50),
        email: z.email().min(8).max(100),// z.string().email is deprecated but z.email() is not
        password: z.string().min(8).max(50),
        phone:z.string().refine(v.isMobilePhone).min(10,{error:"Must be a valid mobile number"})
        //The".refine()" method in Zod is used to add custom validation logic to a schema that goes beyond Zod's built-in validation methods. It provides a way to implement highly specific rules or perform validation that depends on multiple fields within an object.It works ONLY WITH STRING 
    })

    const parsedBody = reqbody.safeParse(req.body)

    console.log(parsedBody)
    console.log(parsedBody.data)
    console.log(parsedBody.success)
    console.log(parsedBody.error)

    if(!parsedBody.success){
        res.json({
            message:"Incorrect Format",
            Error:parsedBody.error
        })
    }
    else{
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        const password = req.body.password
        const phone = req.body.phone


        const hashPass = await bcrypt.hash(password,5);

        try {
            await UserModel.insertOne({
                firstname:firstname,
                lastname:lastname,
                email:email,
                password:hashPass,
                phone:phone
            })

            res.json({
                message:"User Signed Up successfully!"
            })
        } catch (error) {
            res.json({
                message:`${error}`
            })
        }

    }



})


UserRouter.post("/signin",async(req,res)=>{
    const email = req.body.email
    const password = req.body.password

    const userFound = await UserModel.findOne({
        email:email
    })

    if(userFound){
        const passMatch = await bcrypt.compare(password,userFound.password)

        if(passMatch){
            const token = jwt.sign({
                id: userFound._id.toString()
            },process.env.JWT_SECRET)

            res.json({
                token : token
            })
        }
        else{
            res.json({
                Message:"Password does not match"
            })
        }
    }
    else{
        res.sendStatus(403)
        //OR

        // CUSTOM MESSAGE
        // res.status.json({
            // message : "User does not exist in our DB"
        //})
        return
    }


})

export default UserRouter


/*

REFINE()

How It Works ?

The .refine() method takes two arguments:

 1. A validation function: This function receives the value of the schema it is attached to and must return a truthy value if the data is valid, or a falsy value (like false or undefined) to signal failure.

2 . Options (optional): This can be a simple error message string or an object containing a message and an optional path to specify where the error occurred. 


VALIDATOR JS

The validator in JavaScript (often referring to the popular npm validator package) is a library used to validate and sanitize data, PRIMARILY STRINGS. It helps ensure that user input is correct, clean, and meets specific criteria before being processed or stored in a database, which is crucial for maintaining data integrity and application security. 

Key Functions and Uses
The library provides a wide array of simple, built-in functions for common validation tasks, which can be used in both browser-based client-side validation and Node.js server-side validation. 
Key uses include:

1.Form Validation: Checking user input on web forms for correctness before the data is sent to a server. This improves user experience by providing immediate feedback.

2.Data Integrity and Security

3.Sanitization

.. YOU NEED TO READ ABOUT ALL THIS IN DETAIL SO GIVE IT SOME TIME but you have to be good with implementation.






*/