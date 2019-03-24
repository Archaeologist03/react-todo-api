const Done = require('../models/done');
const List = require('../models/list');

exports.addDone = (req, res, db) => {
  let newDone = req.body.newDone;
  const existMessage = { message: 'Item already exist in done list.' };

  // Find name sent from client in List and delete all of the occurrences of that name from list.
  // Client by clicking on done sending request (no point to keep items with same name, so deleteMany it is.)
  // Send response to client with newly added item and message.
  List.find({ name: newDone.name }).then(response => {
    List.deleteMany({ name: newDone.name }).then(response => response);
  });
  // Find item with the name of item sent from client.
  // If it doesn't exist, create item with that name and save it to db.
  // Then sent res to client with new done item obj.
  Done.find({ name: newDone.name }).then(response => {
    if (!response[0]) {
      const done = new Done({ name: newDone.name });
      done.save().then(response => {
        res.json({
          item: newDone,
          message: `Added to done list, item: ${newDone.name}`,
        });
      });
    } else {
      res.json(existMessage);
    }
  });
};

// Delete item from done
exports.deleteDone = (req, res, db) => {
  let itemId = Number(req.params.id);

  Done.deleteMany({ name: '' });

  let newList = db.users[0].done.filter(item => item.id !== itemId);
  db.users[0].done = newList;
  console.log(db.users[0]);

  res.json(`Deleted item with id: ${itemId}`);
};
