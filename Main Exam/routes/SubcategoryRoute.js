const express=require('express');
const routes=express.Router();

const { addSubCategory, insertSubcategory, viewSubCategory, deleteSubcategory, editSubcategory, updateSubcategory, changeStatus } = require('../controllers/SubcategoryController');
routes.get('/',viewSubCategory);
routes.get('/addsubcategory', addSubCategory)
routes.post('/insertsubcategory', insertSubcategory)
routes.get('/deletecategory', deleteSubcategory)
routes.get('/editcategory', editSubcategory)
routes.post('/updateCategory', updateSubcategory)
routes.get('/changestatus', changeStatus)
module.exports=routes
