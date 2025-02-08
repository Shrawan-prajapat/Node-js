const express=require('express');
const routes=express();

routes.use('/',require('./authroute'))


module.exports=routes;