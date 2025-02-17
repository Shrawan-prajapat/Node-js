const express=require('express');
const port=9999;

const app=express()
app.use(express.json());
const db = require('./config/db');

app.use(express.urlencoded());

app.use('/', require('./routes/indexRoute'));
app.listen(port,(err)=>{
    if (err) {
        console.log(err);
        return false;
        
    } 
    console.log(`Server is start on port :- ${port}`);
    
})