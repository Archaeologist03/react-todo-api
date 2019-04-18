const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');
const mongoose = require('mongoose');

const listRoutes = require('./routes/list');
const doneRoutes = require('./routes/done');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(listRoutes);
app.use(doneRoutes);

// const db = {
//   users: [
//     {
//       id: null,
//       name: '',
//       email: '',
//       password: '',
//       todo: [{ id: 1, name: 'TASK n1' }, { id: 5, name: 'ggggg' }],
//       done: [{ id: 2, name: 'TASK n2' }],
//     },
//   ],
// };

// app.get('/', (req, res) => res.json(db));

const PORT = process.env.PORT || 5000;

const mongoURI =
  'mongodb+srv://ilija:bandera123@cluster0-5t3aa.mongodb.net/test?retryWrites=true';

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(res => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
  })
  .catch(err => {
    console.log('erroring', err);
  });
