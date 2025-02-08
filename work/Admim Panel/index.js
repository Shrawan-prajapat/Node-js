const express = require('express');

const port = 8080;

const app = express();

app.set('view engine', 'ejs');


const db = require('./config/db')


const cookieParser = require('cookie-parser');
app.use(cookieParser());
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

const passport=require('passport');
const passportlocal=require('./config/passportlocal');
const session=require('express-session')
app.use(session({
    secret: 'brothers',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge:1000*60*60*24 //1 Day
    }

}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser)
//connect flash middleware start
const flash = require('connect-flash');
app.use(flash());

app.use(function (req, res, next) {
    res.locals.message = req.flash()
    return next();
})
//connect flash middleware end
app.use(express.urlencoded());
app.use('/',require('./routes/indexRoute'))




app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server is start on port :- ${port}`);

})