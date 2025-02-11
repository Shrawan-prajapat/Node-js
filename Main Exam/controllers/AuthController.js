const { response } = require('express');
const User=require('../models/UserModel');
var nodemailer=require('nodemailer');
 const loginpage= async(req,res)=>{
    try{
       if(res.locals?.users){
        return res.redirect('/dashboard');
       }
       return res.render('sign-in')
    }catch(err){
        console.log(err);
        return false;
        
    }
 }
 const registerpage= async(req,res)=>{
    try{
        return res.render('sign-up')
    }catch(err){
        console.log(err);
        return false;
        
    }
 }
 
 const registerUser=async(req,res)=>{
    try{
     const{name,email,password}=req.body;
     const user=await User.create({
        name:name,
        email:email,
        password:password
     })
     console.log("user successfully created");
     return res.redirect('/')
     
     
    }catch(err){
        console.log(err);
        return false;
        
    }
}
const loginUser=async(req,res)=>{
    try{
        return res.redirect('/dashboard')
    }catch(err){
        console.log(err);
        return false;
        
    }
}
const dashboardPage=async(req,res)=>{
    try{
    
    return res.render('dashboard');
     
    }catch(err){
        console.log(err);
        return false;
        
    }
}
const Logout=(req,res)=>{
    req.logout((err)=>{
        if(err){
            console.log(err);
            return false;
            
        }
        return res.redirect('/');
    })
}


module.exports={
    loginpage,registerpage,registerUser,dashboardPage,loginUser,Logout
}