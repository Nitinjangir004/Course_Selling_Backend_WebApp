const  jwt  = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_ADMIN;


function adminauth(req,res,next){
const token  = req.header.token;
const response = jwt.verify(token,JWT_SECRET);

if(response){
    req.userid=response.id;
    next()
}
else{
    res.status(403).json({
        Message:"Incoorect crendtional"
    })
}
}
module.exports = adminauth
