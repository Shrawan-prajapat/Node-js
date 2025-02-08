const express=require('express');

const routes=express.Router();
const { addPage, viewPage, insertProduct } = require('../controllers/ProductController');
routes.get('/',viewPage);

routes.get('/addproduct',addPage )
routes.post('/insertproduct',insertProduct )

module.exports=routes
