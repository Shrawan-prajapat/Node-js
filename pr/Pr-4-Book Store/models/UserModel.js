const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    pages:{
        type:Number,
        required:true
    },
    author:{
        type:String,
        require: true
    },
    
})
const UserModel = mongoose.model('user',userSchema);
module.exports = UserModel;