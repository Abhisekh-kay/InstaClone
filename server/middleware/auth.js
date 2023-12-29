const jwt = require('jsonwebtoken')

exports.verifyToken = async(req,res, next)=>{
    try{
        let token = req.headers("Authorization")

        // If the token is empty
        if(!token){
            res.status(403).send("Access Denied")
        }

        // Removing Bearer from the token
        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)
        req.user = verified;
        next();
    }
    catch(err){
        res.status(500).json({error: err.message})
    }
}