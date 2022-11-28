const Blog = require('../models/blog');
//blog_index, blog_details, blog_create_get, blog_create_post, blog_delete.   controller functions namings.

const blog_index = (req, res) => {
    Blog.find().sort({ createdAt: -1})  // -1 to keep newest blog above
      .then((result) => {
          res.render('index', {title: 'All Blogs', blogs: result})
      })
      .catch((err) => {
          console.log(err);
      });
};

const blog_details = (req, res) => {
    const id = req.params.id;
    // console.log(id);
    Blog.findById(id)
      .then((result) => {
          res.render('details', { blog: result, title: 'Blog Details'});
      })
      .catch((err) => {
          console.log(err);
      });
};

const blog_create_get = (req, res) => {
    res.render('create', { title: 'CREATE A NEW BLOG' });
};

const blog_create_post = (req, res) => {
    //  console.log(req.body);     //req.body --> can access this and tht contains all the information we need from the web form. 
  
    const blog = new Blog(req.body);
   
    blog.save()
      .then((result) => {
          res.redirect('/blogs');    //to display new blogs in home page
      })
      .catch((err) => {
          console.log(err);
      });
};

const blog_delete = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then((result) => {
          res.json({ redirect: '/blogs' })
      })
      .catch((err) => {
        console.log(err);
    });

};


module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
};

