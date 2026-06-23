const Leave = require("../models/Leave");
const Employee = require("../models/Employee");

// Apply Leave
const applyLeave = async (req, res) => {
  console.log("BODY:", req.body);
  console.log("HEADERS:", req.headers);
  try {
    const { employeeId, startDate, endDate, reason } = req.body;

    if (new Date(endDate) < new Date(startDate)) {
      return res.status(400).json({
        message: "End date cannot be before start date",
      });
    }

    const employee = await Employee.findOne({
      userId: employeeId,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee record not found",
      });
    }

    const days =
      Math.ceil(
        (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
      ) + 1;

    const leave = await Leave.create({
      employeeId: employee._id,
      startDate,
      endDate,
      reason,
      days,
    });

    res.status(201).json(leave);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Leave Requests
const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate("employeeId", "name position");

    res.json(leaves);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Approve Leave
const approveLeave = async (req, res) => {
  try {
    console.log("Approve route hit:", req.params.id);
    const leave = await Leave.findById(req.params.id);

    console.log("Leave:", leave);
    console.log("leave employee id:", leave.employeeId);

    if (!leave) {
      return res.status(404).json({
        message: "Leave not found",
      });
    }
    const employee = await Employee.findById(leave.employeeId);
    console.log("Employee found:", employee);
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    if (employee.leaveBalance < leave.days) {
      return res.status(404).json({
        message: "Not enough leave balance",
      });
    }
    console.log("Leave Balance:", employee.leaveBalance);
    console.log("Requested Days:", leave.days);

    const employees = await Employee.find();
    console.log(employees);

    leave.status = "Approved";
    employee.leaveBalance -= leave.days;

    await employee.save();
    await leave.save();

    res.json({
      message: "Leave approved",
      remainingBalance: employee.leaveBalance,
    });
  } catch (error) {
    console.log("Approve leave error", error);
    res.status(500).json(error);
  }
};

// Reject Leave
const rejectLeave = async (req, res) => {
  try {
    const leave = await Leave.findById(req.params.id);

    if (!leave) {
      return res.status(404).json({
        message: "Leave not found",
      });
    }

    leave.status = "Rejected";

    await leave.save();

    res.json({
      message: "Leave rejected",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

// Get Leaves of One Employee
const getEmployeeLeaves = async (req, res) => {
  try {
    const employee = await Employee.findOne({
      userId: req.params.employeeId,
    });
    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }
    const leaves = await Leave.find({
      employeeId: employee._id,
    }).sort({ createdAt: -1 });

    res.json(leaves);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteLeave = async (req, res) => {
  try {
    const leave = await Leave.findByIdAndDelete(req.params.id);

    if (!leave) {
      return res.status(404).json({
        message: "Leave request not found",
      });
    }

    res.status(200).json({
      message: "Leave request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  applyLeave,
  getLeaves,
  approveLeave,
  rejectLeave,
  getEmployeeLeaves,
  deleteLeave,
};
