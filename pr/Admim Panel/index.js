const express = require('express');

const port = 8080;

const app = express();

app.set('view engine', 'ejs');

const path = require('path')
const db = require('./config/db')


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
app.use(express.urlencoded());
app.use('/',require('./routes/indexRoute'))
app.use(express.static(path.join(__dirname, "public")));



app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false
    }
    console.log(`server is start on port :- ${port}`);

})