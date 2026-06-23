const express = require("express");
const Leave = require("../models/Leave");

const {
  applyLeave,
  getLeaves,
  approveLeave,
  rejectLeave,
  getEmployeeLeaves,
  deleteLeave,
} = require("../controller/leaveController");

const router = express.Router();

router.post("/apply", applyLeave);

router.get("/", getLeaves);

router.put("/approve/:id", approveLeave);

router.put("/reject/:id", rejectLeave);

router.get("/employee/:employeeId", getEmployeeLeaves);

router.delete("/:id", deleteLeave);

module.exports = router;
