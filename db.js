const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema =  new Schema({
    email :{type:String,unique:true},
    password :String, 
    firstname:String,
    lastname :String

})


const adminSchema =  new Schema({
    email :{type:String,unique:true},
    password :String, 
    firstname:String,
    lastname :String

})


const courseSchema =  new Schema({
    title :String,
    description :String, 
    imageurl:String,
    price:String,
    createrid :ObjectId

})

const purchasesSchema =  new Schema({
    courseid :String,
    objectid :ObjectId

})

const userModel = mongoose.model("user",userSchema);
const adminModel = mongoose.model("admin",adminSchema);
const courseModel = mongoose.model("course",courseSchema);
const purchasesModel = mongoose.model("purcheses",purchasesSchema);

module.exports ={
    userModel,
    adminModel,
    courseModel,
    purchasesModel
};