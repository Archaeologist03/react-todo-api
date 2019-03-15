const handleDeleteDone = (req, res, db) => {
  let itemId = Number(req.params.id);

  let newList = db.users[0].done.filter(item => item.id !== itemId);
  db.users[0].done = newList;
  console.log(db.users[0]);

  res.json(`Deleted item with id: ${itemId}`);
};

module.exports = {
  handleDeleteDone,
};
