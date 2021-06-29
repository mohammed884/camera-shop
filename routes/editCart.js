const express = require('express');
const jwt  = require('jsonwebtoken');
const Register = require('../modules/register');
const router = express.Router();

router.post('/update/qty/:id' , async (req , res) =>
{
    try 
    {
        const token = req.cookies.token;
        const id = jwt.verify(token , process.env.JWT_SECRET).id;
    
        await Register.updateOne({_id:id , "cart.pId":req.params.id} , {$set:{
            "cart.$.pQty":req.body.qty
        }});
        res.send({msg:'Product Updated' , done:true});
    } 
    catch (err) 
    {
        res.send({msg:'Product Id Wrong' , done:true});
    }
})
router.delete('/cart/delete/product/:id' , async (req , res) =>
{
    try 
    {
        const token = req.cookies.token;
        const id = jwt.verify(token , process.env.JWT_SECRET).id;
        await Register.updateOne({_id:id , "cart.pId":req.params.id} , {$pull:{
            cart:
            {
                pId:String(req.params.id)
            }
        }})
        res.send({msg:'Product Removed' , done:true}) 
    } 
    catch (err) 
    {
        res.send({msg:'Invalid Id' , done:false})
    }
})

module.exports = router