const express = require('express');

const app = express();

const port = 8010;


const db = require('./config/db');

app.set('view engine', 'ejs');

const UserModel = require('./models/UserModel')

app.use(express.urlencoded());


app.get('/', (req, res) => {
    UserModel.find({})
        .then((users) => {
            return res.render('view', {
                alldata: users
            });
        }).catch((err) => {
            console.log(err);
            return false
        })

})


app.get('/add', (req, res) => {
    return res.render('add');
})

app.post('/adduser', (req, res) => {
    const { name, email, password } = req.body;
    UserModel.create({
        username: name,
        useremail: email,
        userpassword: password,
        
    }).then((data) => {
        console.log("record successfully add");
        return res.redirect('/add')
    }).catch((err) => {
        console.log(err);
        return false;
    })
})
app.get(`/deleteuser`, (req, res) => {
    let id = req.query.id;
    UserModel.findByIdAndDelete(id)
        .then((data) => {
            return res.redirect('/')
        }).catch((err) => {
            console.log(err);
            return false;
        })
})

app.get('/edituser', (req, res) => {
    let id = req.query.id;
    UserModel.findById(id)
        .then((single) => {
            return res.render('edit', { single });
        }).catch((err) => {
            console.log(err);
            return false
        })

})
app.post('/updaterecord', (req, res) => {
    const { editid, name, email, password} = req.body;
    UserModel.findByIdAndUpdate(editid, {
        username: name,
        useremail: email,
        userpassword: password,
        
    }).then((data) => {
        console.log("record update");
        return res.redirect('/');
    }).catch((err) => {
        console.log(err);
        return false;
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(err);
        return false;
    }
    console.log(`server is start on port :- ${port}`);
})