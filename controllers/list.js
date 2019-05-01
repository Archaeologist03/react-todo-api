const List = require('../models/list');

// POST - ADD ITEM TO TODO LIST
exports.addTodo = async (req, res, next) => {
  let newTodo = req.body.newTodo;
  let errMsg = { errorMessage: 'Entry not valid' };

  try {
    // Check if user typed anything. Send err if they did not (if its empty str).
    if (newTodo.name) {
      const listItemFindResponse = await List.find({ name: newTodo.name });
      if (!listItemFindResponse[0]) {
        // Checks if item doesn't exist in list and add it to list.
        // Otherwise send 400 bad req.
        const list = new List({ name: newTodo.name });
        const listSavedResponse = await list.save();
        res.json(listSavedResponse);
      } else {
        res.status(400).json('Item already exists.');
      }
    } else {
      res.status(400).json(errMsg);
    }
  } catch (err) {
    console.log(err);
  }
};

// DELETE - DELETE ITEM FROM TODO LIST
exports.deleteTodo = async (req, res, next) => {
  let itemId = req.params.id;
  try {
    await List.findByIdAndDelete({ _id: itemId });
    res.json(`Deleted item with id: ${itemId}`);
  } catch (err) {
    console.log(err);
  }
};
