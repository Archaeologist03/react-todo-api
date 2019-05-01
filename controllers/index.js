const List = require('../models/list');
const Done = require('../models/done');

exports.getIndex = async (req, res, next) => {
  // Get all items from list and from done lists from db and make new obj with them. Send that obj as response to client.
  const list = await List.find();
  const done = await Done.find();
  const response = {
    list,
    done,
  };
  res.json(response);
};
