const User = require('../models/UserModel');
const ProductUser = require('../models/ProductModel');
const fs = require('fs');
const path = require('path');
let nodemailer = require('nodemailer');



const loginPage = (req, res) => {
  if (res.locals?.users) {
    return res.redirect('/dashboard');
  }
  return res.render('login');
};

const registerPage = (req, res) => {
  return res.render('register');
};

const registerUser = async (req, res) => {
  try {
      const { name, email, password, cpassword } = req.body;
      if (password === cpassword) {
          const user = await User.create({
              name: name,
              email: email,
              password: password
          })
          console.log("user create");
          return res.redirect('/');
      } else {
          console.log(`password and confirm password not match`);
          return res.redirect('/register')
      }
  } catch (err) {
      console.log(err);
      return false;
  }
}
const loginUser = async (req, res) => {
  try {
      return res.redirect('/dashboard')
  } catch (err) {
      console.log(err);
      return false;
  }
}

const logout = (req, res) => {
  req.logout((err) => {
      if (err) {
          console.log(err);
          return false;
      }
      return res.redirect('/')
  })
}

const formPage = (req, res) => {
  return res.render('add');
};

const dashboardPage = async (req, res) => {
  try {
    const record = await User.find();
    res.render('dashboard', { record }); 
  } catch (err) {
      console.log(err);
      return false;
  }
}

const informationPage = async (req, res) => {
  if (!req.locals?.users) {
    return res.redirect('/');
  }
  try {
    const record = await ProductUser.find({});
    const userId = req.query.id;
    const user = record.find((val) => val.id === userId);
    return res.render('information', { user });
  } catch (err) {
    console.error('Error fetching records:', err);
    return res.status(500).send('An error occurred while loading the dashboard.');
  }
};
const insertData = async (req, res) => {
    try {
      const { name, music, lyrics, album, lines, singer } = req.body;
      const image = req.files['imageFile'] ? req.files['imageFile'][0].path : '';
     
  
      await ProductUser.create({
        name: name,
        singer: singer,
        music: music,
        lyrics: lyrics,
        album: album,
        lines: lines,
        image: image,
        
      });
  
      return res.redirect('/form');
    } catch (err) {
      console.log(err);
      return res.status(500).send('Error uploading data');
    }
  };

const deleteUser = async (req, res) => {
  try {
    const userId = req.query.id;
    const user = await ProductUser.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    if (user.image) {
      const filePath = path.resolve(__dirname, '../uploads/', user.image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      } else {
        console.warn(`File not found at ${filePath}`);
      }
    }


    await ProductUser.findByIdAndDelete(userId);
    res.redirect('/dashboard');
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).send('An error occurred while deleting the user.');
  }
};

const updateUser = async (req, res) => {
  try {
    let id = req.query.id;
    let single = await ProductUser.findById(id);
    return res.render('edit', {
      single
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const updateData = async (req, res) => {
  try {
    let id = req.body.editid;
    let old = await ProductUser.findById(id);

    if (req.file) {
      if (old.image) {
        fs.unlinkSync(old.image);
      }
      
      await ProductUser.findByIdAndUpdate(id, {
        name: req.body.name,
        singer: req.body.singer,
        music: req.body.music,
        lyrics: req.body.lyrics,
        album: req.body.album,
        lines: req.body.lines,
        image: req.file.path,
      
      });
    } else {
      await ProductUser.findByIdAndUpdate(id, {
        name: req.body.name,
        singer: req.body.singer,
        music: req.body.music,
        lyrics: req.body.lyrics,
        album: req.body.album,
        lines: req.body.lines,
        image: old.image,
      
      });
    }
    console.log("Record updated");
    return res.redirect('/dashboard');
  } catch (err) {
    console.log(err);
    return false;
  }
};

module.exports = {
  loginPage,
  registerPage,
  informationPage,
  registerUser,
  dashboardPage,
  loginUser,
  logout,
  formPage,
  insertData,
  deleteUser,
  updateUser,
  updateData
};
