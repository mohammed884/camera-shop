const express = require('express');
const router = express.Router();
const Register = require('../modules/register');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { isEmpty } = require('lodash');

router.post("/login" , async (req, res) => 
{
    try 
    {

        const {email , password} = req.body;
        if (!email || !password) return res.send({msg:'Please Full All Sections' , done:false});

        const user = await Register.findOne({email:email});
        if (!user) return res.send({msg:'Invalid Email or Password' , done:false});

        const checkPassword = await bcrypt.compare(password , user.password);

        if (!checkPassword) return res.send({msg:'Invalid Email or Password' , done:false});

        else 
        {
            const token = jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET
            );
            
            res.cookie('token' , token , {httpOnly:true , maxAge:(3600 * 1000)*87660})
            res.json({done:true});
        } 
    } 
    catch (e) 
    {
        if (e) throw e;
        res.send(['err']);
        console.log('err')
    }
});
router.get("/user" , async (req, res) => 
{
    try 
    {
        const token = req.cookies.token

        if (!isEmpty(token)) 
        {
            const decoded = jwt.verify(token , process.env.JWT_SECRET , (err , decoded) =>
            {
                if (err) throw err;
                return decoded
            });
           
            const user = await Register.findOne({_id:decoded.id});

            if (!user) return res.send({isLogin:false});

            res.json({user , isLogin:true});
        }     
        else
        {
            res.send({isLogin:false})
        }        
        //[{msg:'Invalid Password or Email' , status:401}]
    } 
    catch (e) 
    {
        res.status(401).send({isLogin:false});
        if (e) throw e;
    }

});

router.post('/user/logout' , (req , res) =>
{
    res.cookie('token' , '')
    res.send({done:true})
})
module.exports = router