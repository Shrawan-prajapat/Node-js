const express=require('express');

const routes=express.Router();
const { loginPage, registerPage, registerUser } = require('../Controllers/authController');
routes.get('/',loginPage)
routes.get('/register',registerPage)
routes.post('/registeruser',registerUser)
module.exports = routes;