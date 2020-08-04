//DB
const mongoose = require('mongoose');
//user table
const UserSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    aadhar:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    training:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//exporting table
const User = mongoose.model('User',UserSchema);//create table in mongodb
module.exports = User;//exporting table