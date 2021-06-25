const jwt = require('jsonwebtoken');
const Register = require('../modules/register');
async function auth(req , res , next)
{  
    try 
    {
        const token = req.header('x-auth-token');
        console.log(token)
        if (!token) return res.status(404).json({msg:'No token'});
        if (token) 
        {
            const decoded = jwt.verify(token , process.env.JWT_SECRET);
            console.log(await Register.findOne({_id:decoded.id}))
            next()
        }        
    } 
    catch (e) 
    {
        res.status(404).json({msg:'NO TOKEN'})
       if (e) throw e 
    } 
}
module.exports = auth