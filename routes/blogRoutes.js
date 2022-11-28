const express = require('express');
//const Blog = require('../models/blog');
const blogController = require('../controllers/blogController');
const verify = require('../routes/verifyToken');
const router = express.Router();  // last router creates a new instance of router object.
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

//blog routes
router.get('/create',blogController.blog_create_get);
/*
router.get('/create', (req, res) => {    //replace /blogs by /  , /blogs/create by /create.
    console.log('form page');
    res.render('create', { title: 'CREATE A NEW BLOG' });
});
*/

router.get('/',blogController.blog_index);
/*
router.get('/', (req, res) => {
    Blog.find().sort({ createdAt: -1})  // -1 to keep newest blog above
      .then((result) => {
          res.render('index', {title: 'All Blogs', blogs: result})
      })
      .catch((err) => {
          console.log(err);
      });   
});

*/

      //post request
      
router.post('/',verify,jsonParser,blogController.blog_create_post);
/*      
router.post('/',(req, res) => {
   //  console.log(req.body);     //req.body --> can access this and tht contains all the information we need from the web form. 
    const blog = new Blog(req.body);

    blog.save()
      .then((result) => {
          res.redirect('/blogs');    //to display new blogs in home page
      })
      .catch((err) => {
          console.log(err);
      });
});
*/

router.get('/:id', blogController.blog_details);
/*
router.get('/:id', (req,res) => {
    const id = req.params.id;
   // console.log(id);
   Blog.findById(id)
     .then((result) => {
         res.render('details', { blog: result, title: 'Blog Details'});
     })
     .catch((err) => {
         console.log(err);
     });
});
*/

router.delete('/:id',blogController.blog_delete);
/*
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then((result) => {
          res.json({ redirect: '/blogs' })
      })
      .catch((err) => {
        console.log(err);
    });

});
*/

//router.get('/login',blogController.blog_login_get);

//router.get('/register',blogController.blog_signup_get);


module.exports = router;