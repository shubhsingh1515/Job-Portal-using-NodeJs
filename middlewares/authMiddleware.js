import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        next("Not authorized to access this route");
    }
        const token = authHeader.split(" ")[1];
        try{
            const payload = jwt.verify(token, process.env.JWT_SECRET);  
            req.user = payload.userId;
            next();
        }catch(error){
            next("Not authorized to access this route");
        }
    };
    export default userAuth;
