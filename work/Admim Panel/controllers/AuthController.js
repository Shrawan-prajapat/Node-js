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
const otppage= async(req,res)=>{
    try{
       return res.render('otp');

    }catch(err){
        console.log(err);
        return false;
        
    }
 }
 const newpassPage= async(req,res)=>{
    try{
       return res.render('newpass');
       
    }catch(err){
        console.log(err);
        return false;
        
    }
 }
 const forgotpass= async(req,res)=>{
    try{
       return res.render('forgot-password');
       
    }catch(err){
        console.log(err);
        return false;
        
    }
 }
 const forgotpassword = async (req, res) => {
    try {
        let useremail = req.body.useremail // Normalize email
        console.log("Searching for user:", useremail); // Debug log

        const user = await User.findOne({ email: useremail });

        if (!user) {
            console.log("User not found in the database.");
            return res.redirect('/forgotpass'); // Redirect if user not found
        }

        const otp = Math.floor(100000 + Math.random() * 900000); // Generate 6-digit OTP
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'shrawan.prajapat.999@gmail.com',
                pass: 'swwo mnnp nylc lkib' // Use App Password instead of your actual password
            }
        });

        var mailOptions = {
            from: 'shrawan.prajapat.999@gmail.com',
            to: useremail,
            subject: 'Forgot Password OTP',
            html: `<h2>Hello ${user?.name}, Your OTP is: <strong>${otp}</strong></h2>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("Error sending email:", error);
                return res.redirect('/forgotpass');
            } else {
                console.log('Email sent: ' + info.response);
                let auth = { email: useremail, otp: otp };
                res.cookie('user', auth);
                return res.redirect('/otp');
            }
        });

    } catch (err) {
        console.log("Error:", err);
        return res.redirect('/forgotpass');
    }
};
    const userOtp=(req,res)=>{
        try{
            let otp=req.body.otp;
          
            
           if(req.cookies?.user?.otp==otp){
            console.log("Otp is match");
            return res.render('newpass')
           }else{
            console.log(err);
            return false;
            
           }
            
        }catch(err){
            console.log("Otp is not match");
            return res.redirect('/otp');
            
        }
    }
    const usernewPass=async(req,res)=>{
        try{
            let newpass=req.body.newpass;
            let cpass=req.body.cpass;
           if(newpass==cpass){
            let email=req.cookies?.user?.email;
            let user=await User.findOneAndUpdate({email:email},{
                password:newpass
            })
            console.log("password changed");
            
            res.clearCookie('user');

           }
           return res.redirect('/');
        }catch(err){
            console.log(err);
            return false;
            
        }

    }

module.exports={
    loginpage,registerpage,registerUser,dashboardPage,loginUser,Logout,otppage,newpassPage,forgotpass,forgotpassword,userOtp,usernewPass
}