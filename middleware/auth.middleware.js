import jwt from 'jsonwebtoken'

 function authMiddleware(req,res,next){
    try{
        const authHeader = req.headers.authorization

        //check authHeader is exist or not
        if (!authHeader) {
            return res.status(401).json({ message: "Access denied. Token missing" })
        }
        // extract token from "Bearer token"
        const token = authHeader.split(" ")[1]

        // verify token
        const decoded = jwt.verify(token,process.env.SECRETKEY)

        // attach userId to request object
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}
export default authMiddleware;
