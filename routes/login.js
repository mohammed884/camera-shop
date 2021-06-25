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
        if (!email || !password) return res.send({msg:'Please Full All Sections'});

        const user = await Register.findOne({email:email});
        const checkPassword = await bcrypt.compare(password , user.password);

        if (!user) return res.send({msg:'Invalid Email or Password'});
        if (!checkPassword) return res.send({msg:'Invalid Email or Password'});
        else 
        {
            const token = jwt.sign(
                {id:user._id},
                process.env.JWT_SECRET
            );
            
            res.cookie('token' , token , {httpOnly:true , maxAge:(3600 * 1000)*87660})
            res.json('done');
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
        let token = req.cookies.token

        if (!isEmpty(token)) 
        {
            const decoded = jwt.verify(token , process.env.JWT_SECRET , (err , decoded) =>
            {
                if (err) throw err;
                return decoded
            });
           
            const user = await Register.findOne({_id:decoded.id});

            if (!user) return res.send([]);

            res.json([user]);
        }     
        else
        {
            res.send([])
        }        
    } 
    catch (e) 
    {
        if (e) throw e;
        res.send([]);
    }

});
module.exports = router