import express from 'express';
import userRouter from "./Routes/UserRoutes.js";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import adminRouter from './Routes/AdminRoutes.js';

dotenv.config();


const app = express();

app.use(express.json());

app.use('/api/v1/user',userRouter);
app.use('/api/v1/admin',adminRouter);


function main(){
    mongoose.connect(`${process.env.MONGO_URI}${process.env.DB_Name}`)
    .then(()=>console.log("Connected Successfully!"))
    .catch((err)=>console.log("Error occured while connecting to DB",err));

    app.listen(process.env.PORT);
}

main();