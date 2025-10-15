import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config()

function adminMiddleware(req,res,next){
    const token = req.headers.token;
    const decodedToken = jwt.verify(token,process.env.JWT_SECRET_admin);

    if(decodedToken){
        // we have populated the req object with userid property
        req.adminId = decodedToken.id;
        next();
    }
    else{
        res.status(403).json({
            message:"You are not Signed In !"
        })
    }

}

export { adminMiddleware }