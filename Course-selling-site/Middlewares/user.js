import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function userMiddleware(req,res,next){
    const token = req.headers.token;
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET);

    if(decodedToken){
        // Here we have populated the req object with the property userid which we have defined
        req.userId = decodedToken.id;
        next()
    }
    else{
        res.status(403).json({
            message:"You are not Signed In!"
        })
    }
}

export { userMiddleware }