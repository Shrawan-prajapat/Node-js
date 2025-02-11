const CategoryModel = require('../models/CategoryModel');

const ProductModel = require('../models/ProductModel');
const fs = require('fs')
const SubcategoryModel = require('../models/SubcategoryModel');
const ExSubcategoryModel = require('../models/ExsubcategoryModel');



const viewPage = async(req, res) => {
    let products = await ProductModel.find({}).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId')
    return res.render('product/view_product', {
        products
    })
}

const addPage = async (req, res) => {
    try {
        return res.render('product/add_product', {
            category: await CategoryModel.find({ status: 'active' }),
            subcategory: await SubcategoryModel.find({status: 'active' }),
            exsubcategory: await ExSubcategoryModel.find({status: 'active' })
        });
    } catch (err) {
        console.log(err);
        return false;
    }
};
const insertProduct = async (req, res) => {
    try {
        if (!req.file) {
            req.flash('error', 'Please upload an image.');
            return res.redirect('/product/addproduct');
        }

        const { category, subcategory, exsubcategory, name, description, price,image } = req.body;
       
        

        await ProductModel.create({
            categoryId: category,
            subcategoryId: subcategory,
            exsubcategoryId: exsubcategory,
            name: name,
            description: description,
            price: price,
            image: req.file.path
        });

        req.flash('success', "Product added successfully.");
        return res.redirect('/product/addproduct');

    } catch (error) {
        console.log("Error inserting product:", error);
        return res.status(500).send("Internal Server Error");
    }
};

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
const deleteProduct = async (req, res) => {
    try {
        let id = req.query.id;
        let single = await ProductModel.findById(id);
        fs.unlinkSync(single.image);
        await ProductModel.findByIdAndDelete(id);
        req.flash("delete", "Product successfully delete");
        return res.redirect('/product');
    } catch (err) {
        console.log(err);
        return false
    }
}
const editProduct = async (req, res) => {
    try {
        let id = req.query.id;
        let categories = await CategoryModel.find({ status: 'active' });
        let subcategories = await SubcategoryModel.find({ status: 'active' });
        let exsubcategories= await ExSubcategoryModel.find({status: 'active' })
        let single = await ProductModel.findById(id).populate('categoryId').populate('subcategoryId').populate('exsubcategoryId')
        return res.render('product/edit_product', {
            category: categories,
            subcategory : subcategories,
            exsubcategory : exsubcategories,
            single: single,
        });
    } catch (err) {
        console.log(err);
        return false
    }
}
const changeStatus = async (req, res) => {
    try {
        const { id, status } = req.query;
        if (status === "active") {
            await ProductModel.findByIdAndUpdate(id, { status: 'active' })
        } else {
            await ProductModel.findByIdAndUpdate(id, { status: 'deactive' })
        }
        req.flash("success", "Product status successfully changed!");
        return res.redirect('/product');
    } catch (err) {
        console.log(err);
        return false
    }
}
const updateProduct = async (req, res) => {
    try {
        const { editid, category, subcategory, exsubcategory } = req.body; 

        await ProductModel.findByIdAndUpdate(editid, {
            categoryId: category, 
            subcategoryId: subcategory, 
            exsubcategoryId: exsubcategory
        });

        req.flash("success", "Product successfully updated");
        return res.redirect('/product');
    } catch (err) {
        console.log("Error updating Exsubcategory:", err);
        return res.status(500).send("Internal Server Error");
    }
};
module.exports = {
    viewPage, addPage, ajaxSubcategorywiseRecord,insertProduct,deleteProduct,editProduct,changeStatus,updateProduct
}