const express=require('express')
let port=8000;
const app=express();
app.set('view engine','ejs')
app.get('/',(req,res)=>{
    return res.render('index')
})
app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false;
    }
    console.log('server is running in port'+port); 
});