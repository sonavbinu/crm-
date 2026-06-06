const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  position: { type: String, default: "Employee" },
  since: Date,
  salary: { type: Number, default: 0 },

  leaveBalance: {
    type: Number,
    default: 12,
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
