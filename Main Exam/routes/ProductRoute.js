const express=require('express');

const routes=express.Router();
const { addPage, viewPage, insertProduct,  deleteProduct, editProduct, updateProduct } = require('../controllers/ProductController');
routes.get('/',viewPage);

routes.get('/addproduct',addPage )
routes.post('/insertproduct',insertProduct )
routes.get('/deleteproduct', deleteProduct)
routes.get('/editproduct', editProduct)
routes.post('/updateproduct',updateProduct)


module.exports=routes
