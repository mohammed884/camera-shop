const express = require('express');
const Register = require('../modules/register');
const Product = require('../modules/product');

const router = express.Router();
const jwt = require('jsonwebtoken')

router.post('/add/to/cart/:id' , async (req , res) =>
{
    const id = jwt.verify(req.cookies.token , process.env.JWT_SECRET).id;
    const user = await Register.findOne({_id:id});
    const product = await Product.findOne({_id:req.params.id});
    const cart = user.cart;
    if (cart.length === 0)
    {
        await Register.updateOne({_id:id} , {$push:{
            cart:
            {
                "pId":String(product._id),
                "pCover":product.cover,
                "pQty":req.body.qty,
                "pPrice":product.price,
                "pTitle":product.title,
            }
        }})
    }
    if (cart.length > 0)
    {
        const index = cart.findIndex(p => p.pId == product._id)
        let newItem = true;

        if (index >= 0)
        {
            await Register.updateOne({_id:id , "cart.pId":String(product._id)} , {$set:{
                "cart.$.pQty":req.body.qty
            }});
            newItem = false;
        }
        if (newItem)
        {
            await Register.updateOne({_id:id} , {$push:{
                cart:
                {
                    "pId":String(product._id),
                    "pCover":product.cover,
                    "pQty":req.body.qty,
                    "pPrice":product.price,
                    "pTitle":product.title,
                }
            }})
        }
    }
})
module.exports = router;