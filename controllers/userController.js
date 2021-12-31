const asyncHandler = require('express-async-handler')
const User=require("../models/userModel");
const generateToken = require('../utils/generateToken');
const registerUser=asyncHandler( async (req,res)=>{
    const{first_name,email,password,isTeacher,pic}=req.body;
    const userExists=await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error("User already Exists")
    }
    const user=await User.create(
        {
            first_name,email,password,isTeacher,pic
        }
    )
    if(user){
        res.status(201).json({

            _id:user._id,
            first_name:user.first_name,
            email:user.email,
            isTeacher:user.isTeacher,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400)
        throw  new Error("Error Occured !!!");
    }
    


    res.json({
        first_name,
        email
    });
})
const loginUser=asyncHandler(async (req,res)=>{
    const{email,password}=req.body
    const user=await User.findOne({email})
    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            first_name:user.first_name,
            email:user.email,
            isTeacher:user.isTeacher,
            isAdmin:user.isAdmin,
            pic:user.pic,
            token:generateToken(user._id)

        })
    }
    else{
        res.status(400)
        throw  new Error("Invalid email or Password !!!");
    }
}
    )
module.exports={registerUser,loginUser}