const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

//add employees

router.post("/add", async (req, res) => {
  console.log("post/add hit");
  console.log(req.body);
  try {
    const { name, position, since, salary } = req.body;

    const employee = new Employee({
      name,
      position,
      since,
      salary,
    });
    await employee.save();

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find();

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//test

router.get("/test", (req, res) => {
  res.send("employee route working");
});

//update employee

router.put("/:id", async (req, res) => {
  console.log("PUT HIT");
  console.log(req.params.id);
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete employee
router.delete("/:id", async (req, res) => {
  console.log("delete hit");
  console.log(req.params.id);
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Employee deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
