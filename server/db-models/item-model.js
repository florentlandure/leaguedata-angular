const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

exports.itemSchema = new Schema({
  id: Number,
  sanitizedDescription: String,
  name: String,
  image: String,
  gold: {
    total: Number,
    purchasable: Boolean,
    sell: Number,
    base: Number
  },
  from: [String]
});
