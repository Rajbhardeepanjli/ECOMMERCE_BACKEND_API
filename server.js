//-----------------------Express-----------------------------------
const express=require('express');
const app=express();

//-----------------------Dotenv----------------------------------
require('dotenv').config();
//-----------------------brcrypt--------------------------------
const bcrypt=require('bcryptjs')
//-----------------------jwt-----------------------------------
const jwt=require('jsonwebtoken');
//-----------------------Mongo_Connection------------------------
const mongoose=require('mongoose');
let mongoConnection=require('./config/db');
mongoConnection.then(()=>{console.log("Database connection is successful");}).catch((error)=>{console.log("there is problem in connection of database");});
//---------------------models---------------------------------
const User=require('./models/user');
//--------------------validation--------------------------
const {userValidationSchema}=require('./validation/validator');


//-----------------------middleware----------------------

const cors=require('cors');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

//----------------------API------------------------------

const authRoutes=require('./routes/authRoutes');
app.use('/api/auth',authRoutes);

app.listen(process.env.PORT,(req,res)=>{
    console.log(`app is listening to port ${process.env.PORT}`)
})