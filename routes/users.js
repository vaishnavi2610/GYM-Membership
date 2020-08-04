//imports
const express = require('express');
const router = express.Router();//routing from server.js to users.js
const passport = require('passport')//authentication
const User = require('../models/User');//getting table
const { forwardAuthenticated } = require('../config/auth');//authentication

//login page
router.get('/login',forwardAuthenticated,(req,res)=>{
    res.render("login");//sending to browser
});

//register page
router.get('/register',forwardAuthenticated,(req,res)=>{
    res.render("register");
});
//sending details
router.post('/register',async (req,res)=>{
    //storing data in variables
    const { name, email, phone, aadhar, gender, training, password, password2 }  = req.body;
    let errors = []//0 errors
    if(phone.match(/^[0-9]+$/) === null || phone.length !== 10){//regular expressions
        errors.push({msg:'Enter a valid phone number.It must be 10 digits only.'})//phone error
    }
    if(aadhar.match(/^[0-9]+$/) === null || aadhar.length !== 12){
        errors.push({msg:'Enter a valid aadhar number.It must be 12 digits only.'})//aadar error
    }
    if(password !== password2){
        errors.push({msg:"Passwords Don't match."})//password error
    }
    if(password.length < 6){
        errors.push({msg:'Password Should be atleast 6 characters long.'})
    }
//additions errors
    if(errors.length >0){
        res.render('register',{//sending errors
            errors,
            name,
            email,
            phone,
            aadhar,
            password,
            password2
        })
    }else{
        //database errors
        //check if email is present in database
        const user = await User.findOne({email:email})
            if(user){
                errors.push({msg:"User Already Exists!"})
                res.render('register',{//send errors 
                    errors,
                    name,
                    email,
                    phone,
                    aadhar,
                    password,
                    password2
                });
            }else{
                //row
                const newUser = new User({
                    name,
                    email,
                    phone,
                    aadhar,
                    gender,
                    training,
                    password
                });
                //table saving
                newUser.save().then().catch()
                //redirecting to login
                res.redirect("login");
            }
    }
});

// Login
//login button
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {//checking with passport
      successRedirect: '/',//home about us page
      failureRedirect: '/users/login',//login page
      failureFlash:true//popup
    })(req, res, next);
  });
  
  // Logout
  router.get('/logout', (req, res) => {
    req.logout();//logout from page
    res.redirect('/users/login');//to login page
  });

module.exports = router;