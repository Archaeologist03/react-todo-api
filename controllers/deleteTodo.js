const handleDeleteTodo = (req, res, db) => {
  let itemId = req.params.id;

  let newTodoList = db.users[0].todo.filter(item => item.id != itemId);
  db.users[0].todo = newTodoList;
  console.log(db.users[0]);

  res.json(`Deleted item with id: ${itemId}`);
};

module.exports = {
  handleDeleteTodo,
};
