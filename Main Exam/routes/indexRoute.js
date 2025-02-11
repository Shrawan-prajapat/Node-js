const express=require('express');
const multer = require('multer')
const passport = require('passport')
const st = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const uniqname = Date.now();
        cb(null, `${file.fieldname}-${uniqname}`);
    }
});

const fileupload = multer({ storage: st }).single('avatar');
const routes=express.Router();
routes.use('/',require('./AuthRoute'))

routes.use('/product',fileupload,require('./ProductRoute'));
module.exports=routes
