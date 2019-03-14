const handleAddDone = (req, res, db) => {
  let newDone = req.body.newDone;

  // Form new todo list. After item is added from todo to done remove it from todo list.
  let newTodo = db.todo.filter(item => item.name !== newDone.name);
  db.done.push(newDone);
  db.todo = newTodo;

  res.json({
    item: newDone,
    message: `Added to done list, item: ${newDone.name}`,
  });
};

module.exports = {
  handleAddDone,
};
