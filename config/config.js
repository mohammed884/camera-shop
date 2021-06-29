// const Register = require('../modules/register');

// const LocalStrategy = require('passport-local').Strategy;

// const bcrypt = require('bcrypt');

// module.exports = PassPortConfig = (passport) =>
// {
//     passport.use(new LocalStrategy({usernameField:'email' , passwordField:'password'} , async function(email , password , done) 
//     {
//         let user = await Register.findOne({email:email});
//         console.log(user.isAdmin)
//         if (!user) {return done(null , false , { message:'Invalid Email Or Password' })};

//         let checkUserPassword = await bcrypt.compare(password , user.password);

//         if (!checkUserPassword) {return done(null , false , {message:'Invalid Email Or Password'})};

//         return done(null , user);
//     })) 
//     passport.serializeUser((user , done) => { done(null , user.id) });

//     passport.deserializeUser((id , done) => { done(null , Register.findOne({_id:id})) })
// }
