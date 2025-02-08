const CategoryModel = require('../models/CategoryModel');

const ProductModel = require('../models/ProductModel');

const SubcategoryModel = require('../models/SubcategoryModel');
const ExSubcategoryModel = require('../models/ExsubcategoryModel');



const viewPage = (req, res) => {
    return res.render('product/view_product', {
        exsubcategory: []
    })
}

const addPage = async (req, res) => {
    try {
        return res.render('product/add_product', {
            category: await CategoryModel.find({ status: 'active' }),
            subcategory: await SubcategoryModel.find({status: 'active' }).populate("categoryId"),
            exsubcategory: await ExSubcategoryModel.find({status: 'active' }).populate("subcategoryId") 
        });
    } catch (err) {
        console.log(err);
        return false;
    }
};
const insertProduct = async (req, res) => {
    try {
        const { category, subcategory, exsubcategory, name, description, price } = req.body;

        await ProductModel.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategoryId: exsubcategory,
            name: name,
            description: description,
            price: price,
            image: req.file.path
        })
        req.flash('success', "Your Products's details inserted successfully.")
        return res.redirect('/product/addproduct')

    } catch (error) {
        console.log(error);
        return false

    }
}
const ajaxSubcategorywiseRecord = async (req, res) => {
    try {
        let subcategoryid = req.query.subcategoryId
        let exsubcat = await ExSubcategoryModel.find({ subcategoryId: subcategoryid }).populate('categoryId').populate('subcategoryId');
        return res.status(200).send({
            success: true,
            message: 'record successfully fetch',
            exsubcategory: exsubcat
        })

    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports = {
    viewPage, addPage, ajaxSubcategorywiseRecord,insertProduct
}