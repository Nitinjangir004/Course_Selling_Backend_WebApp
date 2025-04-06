const express = require('express');
const app = express();
const userrouter = require('./Router/user');
const Courserouter = require('./Router/course');
const adminrouter = require('./Router/admin');
const mongoose = require('mongoose');
require('dotenv').config();
const dblink = process.env.DB_CONNECT;
app.use(express.json());


app.use("/api/v1/user",userrouter);
app.use("/api/v1/course",Courserouter);
app.use("/api/v1/admin",adminrouter);


    
async function start(){
    await mongoose.connect(dblink);
    console.log("data base is live")
    app.listen(3002);
    console.log("port is also live ")
};
start();