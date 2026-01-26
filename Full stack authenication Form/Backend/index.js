import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import UserRouter from "./Routes/UserRoutes.js"


dotenv.config()

const app = express()
app.use(express.json())


app.use("/api/v1/user",UserRouter)
// app.use("/api/v1/user")

// app.use()

function main(){
    mongoose.connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    .then(()=>{
        console.log("DB connected successfully!")
    })
    .catch((err)=>{
        console.log("Something went wrong : ",err)
    })

    app.listen(process.env.PORT,()=>{
        console.log("Server Started!")
    })
}

main()