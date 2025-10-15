// USING ES6 syntax
import express from "express";
import { UserRouter } from "./routes/UserRoutes.js"
import { CourseRouter } from "./routes/CourseRoutes.js";
import { adminRouter } from "./routes/adminRoutes.js";
import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const app = express();


app.use('/api/v1/user',UserRouter)
app.use('/api/v1/course',CourseRouter)
app.use('/api/v1/admin',adminRouter)

// /api/v1 is just a convention for writing complex APIs

// MAIN MOTIVE TO USE ROUTER is that we are not shoving the entire code/routes in the one file.This is cleaner and modular code.

async function main(){
    //coz this is an async task
    await mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)

    app.listen(process.env.PORT,()=>{
        console.log("Server started!")
    })

    // in this function we have defined our connection string to DB and app listening if DB connection fails our server will not get connected which is a good thing
}

main()







// let say we are have our version 1 routes but we are also working on our v2 routes.We need to just change only at one place in index.js not in every file.


// version 1 of our routes.

// app.use('/user/api/v1',UserRouter)
// app.use('/course/api/v1',CourseRouter)

// version 2 of our routes

// app.use('/user/api/v2',Userv2Router)
// app.use('/course/api/v2',Coursev2Router)



