const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: String,
  code: String,
  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },
});

module.exports = mongoose.model("State", stateSchema);
