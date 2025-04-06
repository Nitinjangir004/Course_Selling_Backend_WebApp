const { Router } = require("express");
const adminrouter = Router();
const { adminModel} = require("../db");
const { courseModel} = require("../db");
const  bcrypt = require("bcrypt");
const { z } = require('zod');
const  jwt  = require("jsonwebtoken");
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET_KEY_ADMIN;
const adminauth = require('../Middelwares/adminauth')
adminrouter.post("/signup",async function(req,res){
    const validentry = z.object({
        firstname:z.string().min(4).max(50),
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
const same_email= await  adminModel.findOne({email:email});
    if (same_email) {
        return res.status(400).json({
            message: `${email} already exists` // Fixed grammar
      });
    }
    console.log(same_email);
    const hashpassword = await bcrypt.hash(password,10);
    console.log(hashpassword);
   await  adminModel.create({
        firstname:firstname,
        lastname:lastname,
        email:email,
        password:hashpassword,
    })
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

adminrouter.post("/signin", async function(req,res){
    const { email , password } = req.body;
    const emailcheck = await adminModel.findOne({
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

adminrouter.post("/course", adminauth ,async function(req,res){
    const Adminid = req.userid;
    const {title,description,price,imageurl} = req.body;
  const course = await courseModel.create({
        title,price,description,imageurl,createrid:Adminid
    })
    res.json({
        message:"course is created",
        CourseID:course._id
    });
});

adminrouter.put("/course", adminauth ,async function(req,res){
    const Adminid = req.userid;
    const {title,description,price,imageurl,CourseID} = req.body;
  const course = await courseModel.updateOne({
    _id:CourseID,
    createrid:Adminid
  },{
        title,price,description,imageurl
    })
    res.json({
        message:"course is updated",
        CourseID:course._id
    });


});
adminrouter.get("/course/bulk",async function(req,res){
    const Adminid = req.userid;
  const courses = await courseModel.find({
    createrid:Adminid
  })
    res.json({
        message:"All courses",
        courses
    });
});
module.exports = adminrouter;
