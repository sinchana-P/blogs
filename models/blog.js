const mongoose = require('mongoose');
const Schema = mongoose.Schema;  //last Schema is actually a constructor function and we're going to use it to create a new schema.

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },

},{ timestamps: true });



const Blog = mongoose.model('Blog', blogSchema);   //Blog .
module.exports = Blog;

