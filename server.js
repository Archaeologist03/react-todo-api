const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const db = {
  todo: [{ id: 1, name: 'TASK n1' }],
  done: [{ id: 2, name: 'TASK n2' }],
};

// const db = {
//   todo: ['task1'],
//   done: ['task2'],
// };

app.get('/', (req, res) => {
  // res.send('hello there');
  res.json(db);
});

app.post('/addtodo', (req, res) => {
  // let newTodo = { id: uuid(), name: req.body.newTodo };
  let newTodo = req.body.newTodo;

  if (newTodo.name) {
    db.todo.push(newTodo);
    res.json(newTodo);
  } else {
    res.status(400).json('Entry not valid');
  }

  console.log(db, 'todo');
});

app.post('/adddone', (req, res) => {
  // let newDone = { id: uuid(), name: req.body.newDone };
  let newDone = req.body.newDone;

  let newTodo = db.todo.filter(item => item.id !== newDone.id);

  db.todo = newTodo;
  db.done.push(newDone);

  console.log(db, 'done');

  res.redirect('/');
});

// app.delete('/todoDelete/:id', (req, res) => {
//   let itemId = req.params.id;

//   console.log(db.todo, 'before del');

//   let newList = db.todo.filter(item => item.id === itemId);
//   db.todo = newList;

//   console.log(db.todo, 'from delete..');

//   res.redirect('/');
// });

// app.delete('/doneDelete/:id', (req, res) => {
//   let itemId = req.params.id;

//   let newList = db.done.filter(item => item.id === itemId);
//   db.done = newList;

//   console.log(db.done, 'from delete..');

//   res.redirect('/');
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listeing on port: ${PORT}..`));
