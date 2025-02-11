const { name } = require('ejs');
const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
   
    name: {
        type: String,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "active"
    }
})

const product = mongoose.model('product', productSchema);
module.exports = product