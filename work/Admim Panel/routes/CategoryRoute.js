const express=require('express');

const routes=express.Router();
const { viewCategory, Addcategory, insertCategory, deleteCategory, editCategory, updateCategory, changeStatus } = require('../controllers/CategoryController');
routes.get('/',viewCategory);
routes.get('/addcategory',Addcategory);
routes.post('/insertcategory', insertCategory);
routes.get('/deletecategory', deleteCategory);
routes.get('/editcategory', editCategory);
routes.post('/updateCategory', updateCategory);
routes.get('/changestatus', changeStatus);


module.exports=routes
