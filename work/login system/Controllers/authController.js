const User=require('../models/UserModel')
const loginPage=async(req,res)=>{
    try{
        return res.render('login')
    }catch(err){
        console.log(err);
        return false;
        
    }
}
const registerPage=async(req,res)=>{
    try{
        return res.render('register')
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
module.exports={
    loginPage,registerPage,registerUser
}