const express = require('express');
const router = express.Router();
const Product = require('../modules/product');
const Register = require('../modules/register');
//GET PRODUCTS
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

//POST PRODUCTS
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
            slideImages:req.body.slideImages
        })
        await newProduct.save();
    }
    else
    {
       return console.log('unable to post')
    }
})

//POST COVER IMAGE
router.post('/admin/products/upload/:apikey' , (req , res) =>
{
    if (req.params.apikey == process.env.REACT_APP_API_KEY)
    {
        if (req.files.cover != null)
        {
            const cover = req.files.cover;
            cover.mv(`${__dirname}/../app/public/images/${cover.name}`)
        }
        
    }
    else{
        res.status(401).send('err');
    }
})

router.put('/edit/product/:id' , async (req , res) =>
{
    try 
    {
        var {title , cover , qty , price , desk , shortDesk} = req.body;
        const product = await Product.findOne({_id:req.params.id});
    
        if (!title) title = product.title
        if (!cover) cover = product.cover
        if (!qty) qty = product.qty
        if (!price) price = product.price
        if (!desk) desk = product.desk
        if (!shortDesk) shortDesk = product.shortDesk; 

        await Product.updateOne({_id:req.params.id} , {$set:{
            "pId":req.params.id,
            "title":title,
            "cover":cover,
            "qty":qty,
            "price":Number(price),
            "desk":desk,
            "shortDesk":shortDesk
        }});

        await Register.updateMany({"cart.pId":String(req.params.id)} , {$set:{
            "cart.$.pCover":cover,
            "cart.$.pPrice":Number(price),
            "cart.$.pTitle":title,          
        }});

        res.status(201).send('Product Edited')
    }
    catch (err) 
    {
        res.status(401).send('err while editing product')
    }

})

//GET PRODUCT WITH ID
router.get('/product/:id' , async (req , res) =>
{
    try 
    {
        const product = await Product.findOne({_id:req.params.id});
        if (!product) return res.status(401).send({msg:'No Product Match this Id'});
        res.send(product);
    } 
    catch (err) 
    {
        res.send({msg:err._message});
        if (err) throw err;
    }
    
})

//DELETE PRODUCT 
router.delete('/delete/product/:id' , async (req , res) =>
{
    try 
    {
        await Product.deleteOne({_id:req.params.id});
        await Register.updateMany({"cart.pId":req.params.id} , {$pull:{
            cart:{
                pId:req.params.id
            }
        }})
       res.status(201).send({msg:'Product Removed'});

    } 
    catch (err) 
    {
        if (err) throw err
        res.status(401).send({msg:'Error while Removeing Product'})
    }
    
})
module.exports = router


