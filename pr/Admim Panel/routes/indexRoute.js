const express=require('express');
const routes=express.Router();
routes.use('/',require('./AuthRoute'))
module.exports=routes
