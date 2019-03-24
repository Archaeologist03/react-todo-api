const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const doneSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Done', doneSchema);
