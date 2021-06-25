const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name:
    {
        type:String , required:true, minlegth:3,
    },
    email:
    {
        type:String , required:true , minlength:3
    },
    password:
    {
        type:String , required:true, minlength:8 , maxlength:1024
    },
    cart:
    {
        type:Array
    },
    isAdmin:
    {
        type:Boolean , default:false
    }
})
const Register = new mongoose.model('register', Schema);

module.exports = Register