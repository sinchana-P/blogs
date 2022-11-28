const jwt = require('jsonwebtoken');

module.exports = function(req,res,next){
    const token = req.header('auth-token');   //checks, when we're sending request, if it has that token.
    if(!token) return res.status(401).send('Access Denied');

    try{
       const verified = jwt.verify(token, process.env.TOKEN_SECRET);
       req.user = verified;
       next();
    }catch(err){
       res.status(400).send('Invalid Token');
    }
};


/* JWT :

JWT is used for authorization purpose not authentication.
it has 3 parts:
1. Header
2. Payload
3. Signature */