const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

const addtodo = require('./controllers/addTodo');
const addDone = require('./controllers/addDone');
const deleteTodo = require('./controllers/deleteTodo');
const deleteDone = require('./controllers/deleteDone');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = {
  users: [
    {
      id: null,
      name: '',
      email: '',
      password: '',
      todo: [{ id: 1, name: 'TASK n1' }, { id: 5, name: 'ggggg' }],
      done: [{ id: 2, name: 'TASK n2' }],
    },
  ],
};

app.get('/', (req, res) => res.json(db));

app.post('/addtodo', (req, res) => addtodo.handleAddTodo(req, res, db));

app.post('/adddone', (req, res) => addDone.handleAddDone(req, res, db));

app.delete('/deletetodo/:id', (req, res) =>
  deleteTodo.handleDeleteTodo(req, res, db),
);

app.delete('/deletedone/:id', (req, res) =>
  deleteDone.handleDeleteDone(req, res, db),
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listeing on port: ${PORT}..`));
