const express = require('express');
const port = 8000;
const app = express();

const db = require('./config/db');
// const UserModel = require('./models/UserModel');
const UserModel = require('./models/UserModel')


// Set view engine and middlewares
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Home Route
app.get('/', (req, res) => {
    UserModel.find()
        .then(users => res.render('view', { alldata: users }))
        .catch(err => {
            console.error("Error fetching users:", err);
            res.status(500).send("Error fetching users");
        });
});

// Add User Form Route
app.get('/add', (req, res) => {
    res.render('add');
});

// Insert User Record
app.post('/insertrecord', (req, res) => {
    const { name, price, pages, author } = req.body;

    UserModel.create({ name, price, pages, author })
        .then(() => {
            console.log("Record successfully added");
            res.redirect('/');
        })
        .catch(err => {
            console.error("Error adding record:", err);
            res.status(500).send("Error adding record");
        });
});


// Delete User Record
app.get('/deleteuser', (req, res) => {
    const id = req.query.id;
    UserModel.findByIdAndDelete(id)
        .then(() => res.redirect('/'))
        .catch(err => {
            console.error("Error deleting record:", err);
            res.status(500).send("Error deleting record");
        });
});

// Edit User Form Route
app.get('/edituser', (req, res) => {
    const id = req.query.id;
    UserModel.findById(id)
        .then(single => res.render('edit', { single }))
        .catch(err => {
            console.error("Error fetching record for edit:", err);
            res.status(500).send("Error fetching record for edit");
        });
});

// Update User Record
app.post('/updateRecord', (req, res) => {
    const { editid, name, price, pages, author } = req.body;

    // Validate ID
    if (!editid) {
        console.error("Missing ID for updating record.");
        return res.status(400).send("Invalid request: Missing record ID.");
    }

    // Validate input fields
    if (!name || !price || !pages || !author) {
        console.error("Missing fields in the update request.");
        return res.status(400).send("All fields are required.");
    }

    if (isNaN(price) || isNaN(pages) || price <= 0 || pages <= 0) {
        console.error("Invalid price or pages input.");
        return res.status(400).send("Price and Pages must be positive numbers.");
    }

    // Update the record
    UserModel.findByIdAndUpdate(editid, { name, price, pages, author })
        .then(() => {
            console.log("Record updated successfully");
            res.redirect('/');
        })
        .catch(err => {
            console.error("Error updating record:", err);
            res.status(500).send("Error updating record");
        });
});


// Start Server
app.listen(port, err => {
    if (err) {
        console.error("Server startup error:", err);
    } else {
        console.log(`Server is running on port : ${port}`);
    }
});