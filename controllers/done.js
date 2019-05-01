const Done = require('../models/done');
const List = require('../models/list');

// POST - ADD ITEM TO DONE LIST
exports.addDone = async (req, res, next) => {
  let newDone = req.body.newDone;
  const existMessage = { message: 'Item already exist in done list.' };

  // Find name sent from client in List and delete all of the occurrences of that name from list.
  // Client by clicking on done sending request (no point to keep items with same name, so deleteMany it is.)
  // Send response to client with newly added item and message.
  await List.deleteMany({ name: newDone.name });

  // Find item with the name of item sent from client.
  // If it doesn't exist, create item with that name and save it to db.
  // Then sent res to client with new done item obj.
  const findDoneResData = await Done.find({ name: newDone.name });
  if (!findDoneResData[0]) {
    const done = new Done({ name: newDone.name });
    const doneSavedRes = await done.save();
    res.json({
      item: doneSavedRes,
      message: `Added to done list, item: ${newDone.name}`,
    });
  } else {
    res.json({
      item: { name: null },
      message: existMessage,
    });
  }
};

// DELETE - DELETE ITEM FROM DONE LIST
exports.deleteDone = async (req, res, next) => {
  let itemId = req.params.id;
  await Done.findByIdAndDelete({ _id: itemId });
  res.json(`Deleted item with id: ${itemId}`);
};
