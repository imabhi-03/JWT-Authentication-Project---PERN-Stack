import jwt from "jsonwebtoken";
import env from "dotenv";

env.config();

const authorization= async(req, res, next)=> //Middleware functions process requests before they reach the route handler.

{
    try {
            const jwtToken=req.header("token");

            if(!jwtToken)
            {
                return res.status(403).json("Not Authorize");
            }

            const payload= jwt.verify(jwtToken,process.env.jwtSecret); //method returns the decoded payload (the original data encoded into the token).
            //jwt.verify decodes the Header and Payload of the token.
            // It recomputes the Signature by hashing the Header and Payload with the secret key(i provided).
            // Then, it compares this newly computed Signature with the Signature in the token(third part).
            // If the computed Signature matches the token's Signature, the token is valid.
            req.user=payload.user;
            next();

    } catch (err) {
                        console.error(err.message);
                        return res.status(403).json("Not Authorize");
    }
}

export default authorization;