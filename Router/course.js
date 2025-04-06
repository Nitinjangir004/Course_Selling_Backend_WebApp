const { Router } = require("express");
const Courserouter = Router();
const {purchasesModel,courseModel} = require("../db")
const userauth =  require('../Middelwares/userauth')

Courserouter.post("/Purchases",userauth ,async function(req,res){
const {userid , courseid} = req.body;
const course = await purchasesModel.create({
    userid,courseid
})
    res.json({
        message:"You have succesfuly buy a course ",
        course
    });
});

Courserouter.get("/Preview",function(req,res){
    const courses = courseModel.find({})
    res.json({
        message:"All Courses",
        courses
    });
});

module.exports = Courserouter; 
