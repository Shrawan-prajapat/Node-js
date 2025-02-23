const Category=require('../models/CategoryModel');

const viewCategory = async (req, res) => {
    try {
        let categories = await Category.find({});
        return res.render('category/view_category', {
            category : categories
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}
const Addcategory = async (req, res) => {
    try {
       
        return res.render('category/add_category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
// const insertCategory = async (req, res) => {
//     try {
//         const { category } = req.body

//         let cat = await category.create({
//             category: category
//         })
//         console.log("category successfully add");
//         req.flash('success', "category successfully insert");
//         return res.redirect('category/addcategory')

//     } catch (err) {
//         console.log(err);
//         return false;
//     }
// }

const insertCategory = async (req, res) => {
    try {
        const { category } = req.body; // ✅ Correct variable name
        

        let cat = await Category.create({
            category: category  // ✅ Now correctly using the extracted value
        });

        console.log("Category successfully added");
        req.flash('success', "Category successfully inserted");
        return res.redirect('/category/addcategory');

    } catch (err) {
        console.error("Error inserting category:", err);
        res.status(500).send("Internal Server Error");
    }
};

const deleteCategory = async (req, res) => {
    try {
        let id = req.query.id;
        await Category.findByIdAndDelete(id);
        
        req.flash('delete', "category successfully delete");
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const editCategory = async (req, res) => {
    try {
        let id = req.query.id;
        let singlecategory = await Category.findById(id);
        return res.render('category/edit_category', {
            single: singlecategory
        });
    } catch (err) {
        console.log(err);
        return false;
    }
}

const updateCategory = async (req, res) => {
    try {
        const { editid, category } = req.body;
        let upcategory = await Category.findByIdAndUpdate(editid, {
            category: category
        })
        req.flash('success', "Category Successfully Update");
        return res.redirect('/category');
    } catch (err) {
        console.log(err);
        return false;
    }
}
const changeStatus = async (req, res) => {
    try {
        let id = req.query.id;
        let status = req.query.status;
        if (status === "deactive") {
            await Category.findByIdAndUpdate(id, {
                status: 'deactive'
            })
        } else {
            await Category.findByIdAndUpdate(id, {
                status: 'active'
            })
        }
        req.flash('success', "Category Successfully Changed");
        return res.redirect('/category');

    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports={
    viewCategory,Addcategory,insertCategory,deleteCategory,editCategory,updateCategory,changeStatus
}