const {userValidationSchema}=require('../validation/userValidation');
const User=require('../models/user');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken')


let userRegister=async(req,res)=>{
    try{
     let {error}= userValidationSchema.validate(req.body);
     if(error){
        return res.status(400).json({error:error.details[0].message});
     }
     let {name,email,password}=req.body;
     let existingUser=await User.findOne({email}) 
     if(existingUser){
        return res.status(409).json({message:'User already exist..!!'})
     }
     const hashedPassword=await bcrypt.hash(password,10);

     const newUser=new User({
        name,
        email,
        password:hashedPassword,
     })

     await newUser.save()
     res.status(201).json({ user: email, message: "User Registered Successfull" })

    } catch{
        res.status(500).json({error:'server error...!!!'})
    }
    
}


let userLogin=async (req,res)=>{
   try{
    let {email,password}=req.body;
    if(!email || !password){
      return res.status(400).json({message:'Email and Password both requires'});
    }

    let user= await User.findOne({email})
    if(!user){
      res.status(404).json({message:'user does not exist..!!!'});
    }
     
    const matchPassword=await bcrypt.compare(password, user.password);

    if(!matchPassword){
      res.status(401).json({message:'Password is Invalid..!!!'})
    }


    const token =jwt.sign(
      {userId:user._id, email:user.email, isAdmin:user.isAdmin},
      process.env.JWT_SECRET,
      {expiresIn:'12h'} 
    )

    res.status(201).json({message:'User Login Successfully',token});

   }catch{
      res.status(500).json({error:'server error...!!!'})
   }
}


module.exports={userRegister,userLogin};