const { Router } = require("express");
const userrouter = Router();
const { userModel ,purchasesModel,courseModel} = require("../db");
const  bcrypt = require("bcrypt");
const { z } = require('zod');
const  jwt  = require("jsonwebtoken");
const userauth = require('../Middelwares/userauth'); 
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_KEY_USER;
userrouter.post("/signup",async function(req,res){

    const validentry = z.object({
        firstname:z.string().min(2).max(50),
        lastname:z.string().min(4).max(50),
        email:z.string().min(4).max(50).email(),
        password:z.string().min(4).max(50),
    })
    const requiredata = validentry.safeParse(req.body);
    if(!requiredata.success){
        res.json({
            Message: "Incorrect Data",
            error: requiredata.error,
        });
        return
    }
  try{
const firstname = req.body.firstname;
const lastname = req.body.lastname;
const email = req.body.email;
const password = req.body.password;     
const same_email= await userModel.findOne({email:email});
    if (same_email) {
        return res.status(400).json({
            message: `${email} already exists` // Fixed grammar
      });
    }
    console.log(same_email);
    const hashpassword = await bcrypt.hash(password,10);
    console.log(hashpassword);
   await userModel.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:hashpassword,
    })
    console.log(userModel.create());
    res.json({ message: "User registered successfully!" });
}
catch (error) {
    console.error("Signup Error:", error); // Log the exact error
    return res.status(500).json({
        message: "You are not signed up. Try again.",
        error: error.message // Send error message for debugging
    });
}
});



userrouter.post("/signin",async function(req,res){

    const { email , password } = req.body;
    const emailcheck = await userModel.findOne({
        email:email
     });
     if(!emailcheck){
        res.json({
            message: "Incorect Creadinal"
        })
     };
     const passwordcheck = await bcrypt.compare(password,emailcheck.password);
     if(!passwordcheck){
        res.json({
            message: "Incorect Creadinal"
        })
     }
        else{
     const token = jwt.sign({
        id:emailcheck._id.toString(),
     },JWT_SECRET);
     res.json({
        token
     });
    }
});

userrouter.get("/purcheses_Course", userauth , async function(req,res){
    const {userid} = req.body;
    const purcheses = await purchasesModel.find({
        userid
    })
    const course  =await courseModel.find({
        _id:{$in: purcheses.map(x=>x.courseid) }
    });
        res.json({
            purcheses,
            course
        });
});
module.exports = userrouter; 
