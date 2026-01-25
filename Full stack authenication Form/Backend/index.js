import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"


dotenv.config()

const app = express()


// app.use("/api/v1/SignUp")
// app.use("/api/v1/SignIn")
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