const express = require('express')
const port = 8020;
const app = express();
const path = require('path');
const database = require('./config/db');
database();
const cookieparser = require('cookie-parser');
app.use(cookieparser());

app.set('view engine', 'ejs');

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use('/img', express.static('img'));
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes/indexRoute'));


app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`Server has started on port: ${port}`);
});
