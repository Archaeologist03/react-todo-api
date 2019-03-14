const handleDeleteTodo = (req, res, db) => {
  let itemId = req.params.id;

  let newTodoList = db.todo.filter(item => item.id != itemId);
  db.todo = newTodoList;

  res.json(`Deleted item with id: ${itemId}`);
};

module.exports = {
  handleDeleteTodo,
};
