const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  name: { type: String, required: true },
  position: { type: String, default: "Employee" },
  since: Date,
  salary: { type: Number, default: 0 },

  leaveBalance: {
    type: Number,
    default: 30,
  },

  countryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
  },

  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
  },

  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
