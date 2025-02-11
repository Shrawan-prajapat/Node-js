const express=require('express');

const routes=express.Router();
const { addPage, viewPage, insertProduct, ajaxSubcategorywiseRecord, deleteProduct, editProduct, updateProduct, changeStatus } = require('../controllers/ProductController');
routes.get('/',viewPage);
routes.get('/ajaxsubcategorywiserecord', ajaxSubcategorywiseRecord)
routes.get('/addproduct',addPage )
routes.post('/insertproduct',insertProduct )
routes.get('/deleteproduct', deleteProduct)
routes.get('/editproduct', editProduct)
routes.post('/updateproduct',updateProduct)
routes.get('/changestatus', changeStatus)

module.exports=routes
