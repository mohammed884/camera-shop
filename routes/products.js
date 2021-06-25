const express = require('express');
const router = express.Router();
const Product = require('../modules/product');

router.get('/products/:apikey' , async (req , res) =>
{
    if (req.params.apikey == process.env.REACT_APP_API_KEY)
    {
        res.json(await Product.find())
    }
    else 
    {
        res.send('Your Unable to get this data')
    }
})

router.post('/admin/products/add/:apikey' , async (req , res) =>
{
    if (req.params.apikey == process.env.REACT_APP_API_KEY)
    {
        const newProduct = await new Product({
            title:req.body.title,
            qty:req.body.qty,
            price:req.body.price,
            desk:req.body.desk,
            shortDesk:req.body.shortDesk,
            cover:req.body.cover,
        })
        await newProduct.save();
        res.cookie('check' , false)
    }
    else
    {
       return console.log('unable to post')
    }
})
router.post('/admin/products/upload/:apikey' , (req , res) =>
{
    if (req.params.apikey == process.env.REACT_APP_API_KEY)
    {
        const cover = req.files.cover;
        cover.mv(`${__dirname}/../app/public/images/${cover.name}`)
    }
    else{
        res.send('err');
    }
})
router.get('/product/:id' , async (req , res) =>
{
    try 
    {
        const product = await Product.findOne({_id:req.params.id});
        if (!product) return res.send({msg:'No Product Match this Id'});
        res.send(product);
    } 
    catch (err) 
    {
        res.send({msg:err._message});
        if (err) throw err
    }
    
})
module.exports = router


