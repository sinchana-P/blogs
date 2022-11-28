const express = require('express'); //returns function
const morgan = require('morgan');
const mongoose = require('mongoose'); //it's an object
//const Blog = require('./models/blog');
const blogRoutes = require('./routes/blogRoutes');
const bodyParser = require('body-parser');

const dotenv = require('dotenv');   //19.

// express app
const app = express();

//Import routes
const authRoute = require('./routes/auth');  //9.
//const postRoute = require('./routes/posts');

dotenv.config();   //to initiate and make everything work  //20.

/*
//connect to mongodb
const dbURI = 'mongodb+srv://Sinchana:Sinchu333@nodetuts.i6dam.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology:true}) // mongoose is going to go out and connect to that database (bdURI). and 2nd parameter is option just to avoid deprecation Warning. 
   .then((result) => {
      console.log('db connected');
   }) // (console.log('connected to db'))  above is an asnynchronous task ,it goes out and it takes some time to do & therefore it returns something like promise.
   .catch((err) => console.log(err));

*/

//connect to DB
mongoose.connect(   //14.
    process.env.DB_CONNECT, //15.  //21.  -- to access  //22. create a folder "model"  --- create a file within it "User.js"
    () => console.log('connected to db!')  //16. ---- //17. stop server or close terminal --- npm install dotenv  --- from this v can create a environmental variable & store the Password there.  //18. create a file in root --- .env
);  //removed URL and pasted in dotenv file for security


//Middleware
app.use(express.json());  //28.  -- now we can send post requests (from postman)  // go to auth.js
app.use(bodyParser.urlencoded({ extended: false }));


//register for view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true})); //this basically takes all the URL encoded data that comes along from the form , and passes that into an object that we can use on the request object (in post req handler).
app.use(morgan('dev'));

//Route Middlewares
app.use('/user', authRoute);      //10.  everything in the authRoute have the prefix --- '/api/user'  --- '/api/user/register  //11. go to package.json and delete test and start property  --- // run terminal "npm start" //go to postman -- post -> "api/user/register"  --send -- o/p -- Register.  // connect to a DB. -- open mongoDB.  //12. Install "mongoose" package -- npm install mongoose  -- to make mongo easy to use.

//app.use('/api/posts', postRoute);

/*
//mongoose and mongo sandbox routes    -->just to test out the interaction of blog model with database.
app.get('/add-blog', (req, res) => {   // /add-blog --> this is going to be used to add a blog to the collection.   & we'll fire a callback when a request comes in , taking the request object and the response object
    const blog = new Blog({
        title: 'new blog 2',                 // create a new instance of blog documents and save that to blog's collection in the database.
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });                       

    blog.save()              //to save this data to database. & it's an asynchronous method so use then method.
       .then((result) => {
           res.send(result)
       })
       .catch((err) => {
           console.log(err);
       });
});

app.get('/all-blogs', (req, res) => {
    Blog.find()
      .then((result) => {
          res.send(result);
      })
      .catch((err) => {
          console.log(err);
      });
});


// for single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('6287d73b277c2f4286f1a99e')   // asynchronous fun
       .then((result) => {
           res.send(result);
       })
       .catch((err) => {
        console.log(err);
    });
})

// listen for express
//app.listen(3000);

*/


//routes (basic routes)
app.get('/', (req, res) => {
    res.redirect('/blogs');   //line 83
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'ABOUT' });
});

app.get('/login', (req, res) => {
    res.render('login', { title: 'login'});
})

app.get('/signup', (req, res) => {
    res.render('signup', { title: 'signup'});
})
/*
//blog routes  //shifted to blogRoutes.js
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1})  // -1 to keep newest blog above
      .then((result) => {
          res.render('index', {title: 'All Blogs', blogs: result})
      })
      .catch((err) => {
          console.log(err);
      });
});

      //post request
app.post('/blogs',(req, res) => {
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

app.get('/blogs/:id', (req,res) => {
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

app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
      .then((result) => {
          res.json({ redirect: '/blogs' })
      })
      .catch((err) => {
        console.log(err);
    });

})

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'CREATE A NEW BLOG' });
});

*/

//blog routes
app.use('/blogs', blogRoutes); // it applies all of the handlers (get,post) to the app here .  // '/blogs' scopes to specific URL.

//app.use(express.json());

// 404 pages
app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});

app.listen(3000 ,() => {
    console.log('app is running on port 3000');
});





/* steps :

1.blog project - by node course
2.authentication of user & JWT
3.sign_in / sign_up 

*/