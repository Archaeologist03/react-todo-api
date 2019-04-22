const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('config');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/list', require('./routes/list'));
app.use('/done', require('./routes/done'));
app.use('/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

const mongoURI = config.get('mongoURI');

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useCreateIndex: true })
  .then(res => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch(err => {
    console.log('erroring', err);
  });
