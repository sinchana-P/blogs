const router = require('express').Router();  //5.
const User = require('../models/user');  //26.  -- .. coz v r navigating out 1 folder.
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { registerSchema, loginSchema } = require('../validation');
const jwtToken = require('../models/jwtToken');

//validation
// 33.  // in user.js -- we have created a schema with what kind of information we have in our user
        // well we can create a schema here with validation.

//const Joi = require('@hapi/joi');  //33.

/*const schema = {    //schema with validation  //34.
     name: Joi.string().min(6).required(),
     email: Joi.string().min(6).required().email(),
     password: Joi.string().min(6).required()
}
*/

//path: http://localhost:3000/api/user/register
// Register

router.get('/register',(req, res) => {
    res.render('signup', {title: 'New User'});
});

router.post('/register', async (req, res) => {   //7.
   // res.send('Register');                      //8.

   //1. //LETS VALIDATE THE DATA BEFORE WE MAKE A USER  //35.  -- before v actually submit everything, v can validate the response tht we're getting from user.
  
   //const {error} = registerValidation(req.body);
     //const {error} = await registerSchema.validateAsync(req.body);
     try {
        await registerSchema.validateAsync(req.body);
    } catch (error) {
        const { message } = error.details[0];
        return res.status(400).send(message);
    }

   //const { error } = Joi.validate(req.body, schema);  //36. schema -- tht v just made above.  // throws us back an object -- validation & now we don't need all output to get displayed , we need only error so, -- {error}
   // res.send(validation);  //37. -- check in postman.  o/p = "error": {} & "value": {}

    // if(error) return res.status(400).send(error.details[0].message);  //38.  -- if v hv an error, no use in going down.  //check in postman.  //39. create a file in root "validation.js"
   
   //2. //Checking if the user already in the database
   const emailExist = await User.findOne({email: req.body.email});    //User is a model
   if(emailExist) return res.status(400).send('Email already exists');

   //Hash passwords
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);  //salt basically combines with your passwords and its gonna create a mumble and the mess of a text & that only bcrypt can decrypt it

   //3. // Create a new user
   const user = new User({  //27. -- v r gonna use that model we have made
       name: req.body.name,  // this is gonna be coming from request body  // in postman -> body -> the contents there could be accessed by -- req.body.****
       email: req.body.email,
       //password: req.body.password   // go to index.js -- coz --- we won't be able to read it from postman when we post so we have to use something called bodyParser.
       password: hashedPassword 
       //29. we have just created a newUser here.  //after creating new user we can "SAVE" it  -- add 'async' above, coz we need some time until we actually submit things to the DB.
   })
   try{  //30. try to submit and catch the Error.  //31. check in postman by sending & see the stored i/p . //go to mongoDB atlas and check if it is submitted there. // we have 2 problems here, 1. shd hide pw --- 2.v shd do validation for proper character in pw and for actual email.  // first let's do validation.  //32. Install package to validate information tht we're getting from user is -- Joi so, --- npm install @hapi/joi 
       const savedUser = await user.save();  // taking user from above.
       //res.send(savedUser);
       console.log('user details is saved');
      // res.send({user: user._id});   //res.send(savedUser);
       res.redirect('/user/login');
    }catch(err){
       res.status(400).send(err);
      
   }
   
});

// Login
router.get('/login',(req, res) => {
    res.render('login', {title: 'User Login'});
})


router.post('/login', async (req,res) => {

    //1. //LETS VALIDATE THE DATA BEFORE WE MAKE A USER
   //const {error} = registerValidation(req.body);
   const {error} = await loginSchema.validateAsync(req.body);

   //const { error } = Joi.validate(req.body, schema);
   console.log(error);
   if(error) return res.status(400).send(error.details[0].message);
   
   //2. //Checking if the email exists
   const user = await User.findOne({email: req.body.email});    //User is a model
   if(!user) return res.status(400).send('Email is not found');

   // Check if PASSWORD is correct
   const validPass = await bcrypt.compare(req.body.password, user.password);  //req.body.password -- the one tht user sends
   if(!validPass) return res.status(400).send('Invalid password');

   //Create and design a token
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   res.header('auth-token', token).redirect('/blogs');
   console.log("token:", token);

  // res.send('logged in')


   // To save Token in DB
   const jwttoken = new jwtToken({
      token: token
   })
   try{
       const savedToken = await jwttoken.save();
       console.log('Token is Saved to DB');
   }
   catch(err){
       res.send(err);
   }
});

//router.post('/login');



module.exports = router;  //6.