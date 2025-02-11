const express=require('express');
const routes=express.Router();
const { viewexsubCategory, addexSubCategory, insertExsubcategory, ajaxCategorywiseRecord, deleteExSubcategory, editExsubcategory, changeStatus, updateExsubcategory } = require('../controllers/ExsubcategoryController');
routes.get('/',viewexsubCategory);
routes.get('/addexsubcategory',addexSubCategory )
routes.post('/insertexsubcategory',insertExsubcategory )
routes.get('/ajaxcategorywiserecord', ajaxCategorywiseRecord)
routes.get('/deleteexsubcategory', deleteExSubcategory)
routes.get('/editexsubcategory', editExsubcategory)
routes.post('/updateexsubcategory',updateExsubcategory)
routes.get('/changestatus', changeStatus)
module.exports=routes
