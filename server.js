const express = require('express');
const app = express();
require('dotenv').config()
//NPM PACKGES
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const corse = require('cors');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');

//SET UP MONGOOSE
mongoose.connect(process.env.REACT_APP_DATABASE_URL , 
    {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//SET UP SERVER
app.use(cookieParser())
app.use(express.json());
app.use(fileUpload());
app.use(flash())

app.use(corse({
    origin:'http://localhost:3000',
    credentials:true,
}));

// proxy support
app.enable("trust proxy")
//ROUTERS
const products = require('./routes/products');
const register = require('./routes/register');
const login = require('./routes/login');
const cart = require('./routes/cart');
const editCart = require('./routes/editCart');

app.use('/' , products)
app.use('/' , register)
app.use('/' , login);
app.use('/' , cart)
app.use('/' , editCart)
const PORT = 8000
app.listen(PORT , (e) =>
{
    if (e) throw e;
    console.log('Server Running on Port ' + PORT)
})