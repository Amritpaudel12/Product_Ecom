
import jwt from 'jsonwebtoken'  

export const verifyJwt = async (req, res, next) => {
    try {
        const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
        console.log("TOKEN ", token);

        if(!token) {
            res.status(401).json({"error ": "token is required!"}); 
        }

        const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

        if(
            !user
        ) {
            res.status(403).json({"error": "Invalid Token"});
        }

        req.id = user.userId;

        next();

    } catch (error) {
        console.log("jwt verification error: ", error);
        res.status(403).json({error: "Invalid or Expired Token "});
    }
}