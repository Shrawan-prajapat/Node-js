const mongoose = require('mongoose');

const userDetailsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    singer: {
        type: String,
        required: true,
    },
   
    image: {
        type: String,
        required: true,
    }
    ,
   
    album: {
        type: String,
        required: true,
    }
    ,
   
    music: {
        type: String,
        required: true,
    }
    ,
   
    lyrics: {
        type: String,
        required: true,
    }
    ,
   
    lines: {
        type: String,
        required: true,
    } ,
   
    
});
const UserDetails = mongoose.model('UserDetails', userDetailsSchema);
module.exports = UserDetails;