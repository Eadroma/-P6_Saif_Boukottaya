const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@piiquante.dgskv.mongodb.net/sauce?retryWrites=true&w=majority`

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('mongoDB connected !'))
  .catch(err => console.error(err));
app.use(express.json())
app.use(helmet.permittedCrossDomainPolicies());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});
// ROUTES
const user = require('./routes/user');
const sauce = require('./routes/sauce');

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', user);
app.use('/api/sauces', sauce);

module.exports = app;