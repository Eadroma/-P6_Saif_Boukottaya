const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const salRounds = 10;
module.exports = {
    createUser: async function(email, password) {
        // Check if email already exists in our database
        let isMail = await User.findOne({ email : email});
        
        if (isMail) {
            console.log('mail exists !');
        }

    }
}


// const mongoose = require('mongoose');

// User.findOne({ email : req.body.email }).then((user) => {
//     // throw a 400 error if the mail adress already exists
//     if (user)
//       return res.status(400).json({ message: 'A user has already registered with this email'});
//     else {
//       bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
//         const newUser = new User({
//           email : req.body.email,
//           password: hash
//         })
//       })
//       // Otherwise, create user
//       const newUser = new User({
//         email : req.body.email,

//       })
//     }
//   })