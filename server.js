const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

// MIDDLEWARES
app.use(express.json());

// CORS "fix"(bypass)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE',
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-auth-token');

  next();
});
app.use(cors());

// ROUTES
app.use('', require('./routes/index'));
app.use('/list', require('./routes/list'));
app.use('/done', require('./routes/done'));
app.use('/auth', require('./routes/auth'));

// If doesnt match any of prior routes
app.use((error, req, res, next) => {
  console.log(error, 'from last resort middleware.. server');
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

// DATABASE / SERVER CONFIG
const PORT = process.env.PORT || 5000;

const mongoURI = process.env.MONGO_URI || config.get('mongoURI');

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(res => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch(err => {
    console.log('erroring', err);
  });
