const express=require('express');

const routes=express.Router();
const { loginpage, registerpage, registerUser, dashboardPage, loginUser } = require('../controllers/AuthController');
const passport=require('passport')
routes.get('/',loginpage)
routes.get('/register',registerpage)
routes.get('/dashboard',passport.checkUser,dashboardPage)
routes.post('/registeruser',registerUser)
routes.post('/loginuser',passport.authenticate('local',{failureRedirect:'/'}),loginUser)
routes.get('/logout',)
console.log("done")

module.exports=routes
