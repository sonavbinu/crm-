const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: String,
  code: String,
});

module.exports = mongoose.model("City", citySchema);
