const express = require('express');
const User = require('./models/User.js');
const createUser = require('./controllers/userController')
const mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const app = express();
const saltRounds = 10;
const uri = "mongodb+srv://eadroma:admin@piiquante.dgskv.mongodb.net/sauce?retryWrites=true&w=majority";
mongoose.connect(uri, function(err) {
  if (err) throw err;
  console.log('Successfully connected to MongoDB');
});
// TEST USER 
// let testUser = new User({
//   email: 'test',
//   password: 'test'
// })

// testUser.save(function(err) {
//   if (err) throw(err)
//   console.log('test User saved ! ');
// })

// USER REGISTRATION
app.post('/api/auth/signup', (req, res) => {
  const mail = new URLSearchParams(req.url).get('/api/auth/signup?email');
  const pwd = new URLSearchParams(req.url).get('password');
  createUser(mail, pwd);
  
})
app.use('/api/sauces', (req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

module.exports = app;