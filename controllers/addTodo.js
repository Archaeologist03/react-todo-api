const handleAddTodo = (req, res, db) => {
  let newTodo = req.body.newTodo;
  let errMsg = { errorMessage: 'Entry not valid' };

  // Check if user typed anything. Send err if they did not (if its empty str).
  if (newTodo.name) {
    db.users[0].todo.push(newTodo);
    res.json(newTodo);
  } else {
    res.status(400).json(errMsg);
  }

};

module.exports = {
  handleAddTodo,
};
