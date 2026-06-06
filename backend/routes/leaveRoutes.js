const express = require("express");

const {
  applyLeave,
  getLeaves,
  approveLeave,
  rejectLeave,
  getEmployeeLeaves,
} = require("../controller/leaveController");

const router = express.Router();

router.post("/apply", applyLeave);

router.get("/", getLeaves);

router.put("/approve/:id", approveLeave);

router.put("/reject/:id", rejectLeave);

router.get("/employee/:employeeId", getEmployeeLeaves);

module.exports = router;
