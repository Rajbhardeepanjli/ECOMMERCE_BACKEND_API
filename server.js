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

//-----------------------------------------Form Image Handling----------------------------------------
const multer = require('multer');
const { cloudinary } = require('./config/cloudinary');
const { storage } = require('./config/cloudinary');
const upload = multer({ storage });
//--------------------validation--------------------------
const {userValidationSchema}=require('./validation/userValidation');
const {productValidationSchema}=require('./validation/productValidation')


//-----------------------middleware----------------------

const cors=require('cors');
app.use(express.json());
const authenticate=require('./middleware/authMiddleware')
app.use(express.urlencoded({extended:true}));
app.use(cors());

//----------------------API------------------------------
//User_routes---------------
const authRoutes=require('./routes/authRoutes');
app.use('/api/auth',authRoutes);
//Product_routes--------------
const productRoutes=require('./routes/productRoutes')
app.use('/api/products',productRoutes)  
//Cart_routes--------------------------------------------
const cartRoutes=require("./routes/cartRoutes")
app.use('/api/cart',cartRoutes)

// ------------------- Global Error Handler ------------------------
app.use((err, req, res, next) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ message: "Server Error", error: err.message });
});

app.listen(process.env.PORT,(req,res)=>{
    console.log(`app is listening to port ${process.env.PORT}`)
})