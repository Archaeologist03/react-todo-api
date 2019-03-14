const handleDeleteDone = (req, res, db) => {
  let itemId = Number(req.params.id);

  let newList = db.done.filter(item => item.id !== itemId);
  db.done = newList;

  res.json(`Deleted item with id: ${itemId}`);
};

module.exports = {
  handleDeleteDone,
};
