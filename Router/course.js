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

Courserouter.get("/Preview",async function(req,res){
    try {
        const courses = await courseModel.find({})
        res.json({
            message:"All Courses",
            courses
        });
    } catch (error) {
        res.status(500).json({
            "message":"error in preview " ,error,
        });
    }
});

module.exports = Courserouter; 
