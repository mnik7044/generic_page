const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  name: String,
  genericName: String,
  distributors: [String],
  priceDifference: Number,
});

module.exports = mongoose.model('Medicine', medicineSchema);
