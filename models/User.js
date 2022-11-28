const mongoose = require('mongoose');  //23.

// Create a Schema that basically represents the model of our user.
const userSchema = new mongoose.Schema({  //24.  //this is gonna b an object.
    name: {   // property which is also an object.
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6
    },
    password: {
        type: String,
        required: true,
        max: 1024,  //large enough , so that v can hash later.
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', userSchema);  //25.  random name is --- User  &  Schema is --- userSchema   -- go to auth.js