const express = require('express');
const Register = require('../modules/register');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register' , async (req , res) =>
{
    try 
    {
        let user = await Register.findOne({email:req.body.email});

        if (!user)
        {
            const hashedPassword = await bcrypt.hash(req.body.password , 10)
             user = await new Register({
                name:req.body.name,
                email:req.body.email,
                password:hashedPassword,
            })     
            await user.save();  
        }
    } 
    catch (e) 
    {
        console.log(e)
    }

})

module.exports = router