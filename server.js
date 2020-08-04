//imports
//backend express
const express = require('express');
//html views ( ejs templating language )
const expressLayouts = require('express-ejs-layouts');
//database ( MongoDB ) -> JS Middleware
const mongoose = require('mongoose')
//express object returns to app
const app = express();
//express session login ( save login state )
const session = require('express-session');
// pop up messages
const flash = require('connect-flash');
// authentication  
const passport = require('passport')
//passing passport 
require('./config/passport')(passport);

//DB Connection from keys.js
const db = require('./config/keys').MongoURI;

//connect to mongodb
//main connection
mongoose.connect(db,{ useNewUrlParser:true,useUnifiedTopology: true })//convetions(avoid warnings)
.then(()=>{console.log('Database Connected..')})//if connected
.catch(e=>console.log(e))//error

//EJS
//using ejs
app.use(expressLayouts);
//set ejs as views
app.set('view engine','ejs');

//middlewares
//static files
//images are present in views/images
app.use('/images', express.static(__dirname + '/views/Images'));
//isolation
app.use(express.urlencoded({ extended:false }))
//session
app.use(session({
    secret:'something',//secretkey
    resave:true,//redirection=>login
    saveUninitialized:true//new user
}));
//passport start
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash()); //pop messages

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');//regrestration successful
  res.locals.error_msg = req.flash('error_msg');//errors
  res.locals.error = req.flash('error');
  next();//sending data to 3rd function
});

//routes
//homepage details bill pay
app.use('/',require('./routes/home'));
//user login / registration
app.use('/users',require('./routes/users'));



//deploy
const PORT = process.env.PORT || 3000;//localhost

app.listen(PORT,console.log(`App running on port ${PORT}...`))//starting application
