const  jwt  = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_KEY_ADMIN;


async function adminauth(req,res,next){
try {
    const token  = req.headers.token;
const response = await jwt.verify(token,JWT_SECRET);

if(response){
    req.userid=response.id;
    next()
}
else{
    res.status(403).json({
        Message:"Incoorect crendtional"
    })
}
} catch (error) {
 res.status(500).json(
    {
        "message":"admin auth error:-" ,error,
    }
 );   
}
}
module.exports = adminauth
