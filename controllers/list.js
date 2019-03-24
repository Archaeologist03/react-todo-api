const List = require('../models/list');
const Done = require('../models/done');

exports.getIndex = (req, res, next) => {
  // Get all items from list and from done lists from db and make new obj with them. Send that obj as response to client.
  List.find().then(list => {
    Done.find().then(done => {
      const response = {
        list: list,
        done: done,
      };
      res.json(response);
    });
  });
};

exports.addTodo = (req, res, db) => {
  let newTodo = req.body.newTodo;
  let errMsg = { errorMessage: 'Entry not valid' };

  // Check if user typed anything. Send err if they did not (if its empty str).
  if (newTodo.name) {
    List.find({ name: newTodo.name })
      .then(response => {
        if (!response[0]) {
          const list = new List({ name: newTodo.name });
          list
            .save()
            .then(response => {
              res.json(response);
            })
            .catch(err => console.log(err));
        } else {
          res.status(400).json('Item already exists.');
        }
      })
      .catch(err => console.log(err));
  } else {
    res.status(400).json(errMsg);
  }
};

exports.deleteTodo = (req, res, db) => {
  let itemId = req.params.id;

  List.findByIdAndDelete({ _id: itemId }).then(response => {
    res.json(`Deleted item with id: ${itemId}`);
  });
};
