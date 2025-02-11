
const ProductModel = require('../models/ProductModel');
const fs = require('fs')



const viewPage = async(req, res) => {
    let products = await ProductModel.find({})
    return res.render('product/view_product', {
        products
    })
}

const addPage = async (req, res) => {
    try {
        return res.render('product/add_product');
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

        const {  name, description, price,image,qty } = req.body;
       
        

        await ProductModel.create({
        
            name: name,
            description: description,
            price: price,
            qty: qty,
            image: req.file.path
        });

        req.flash('success', "Product added successfully.");
        return res.redirect('/product/addproduct');

    } catch (error) {
        console.log("Error inserting product:", error);
        return res.status(500).send("Internal Server Error");
    }
};


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

        let single = await ProductModel.findById(id)
        return res.render('product/edit_product', {

            single: single,
        });
    } catch (err) {
        console.log(err);
        return false
    }
}

const updateProduct = async (req, res) => {
    try {
        const { editid, name, description, price, image,qty } = req.body; 

        await ProductModel.findByIdAndUpdate(editid, {
            name,
            description,
            price,
            image,qty
        });

        req.flash("success", "Product successfully updated");
        return res.redirect('/product');
    } catch (err) {
        console.log("Error updating product:", err);
        return res.status(500).send("Internal Server Error");
    }
};

module.exports = {
    viewPage, addPage ,insertProduct,deleteProduct,editProduct,updateProduct
}