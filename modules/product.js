const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    title:
    {
        type:String , minlength:1 , required:true
    },
    price:
    {
        type:Number , min:1
    },
    qty:
    {
        type:Number , min:1
    },
    cover:
    {
        type:String , required:true
    },
    shortDesk:
    {
        type:String , required:true
    },
    desk:{
        type:String , required:true
    }
});
const Product = new mongoose.model('products' , Schema);

module.exports = Product;