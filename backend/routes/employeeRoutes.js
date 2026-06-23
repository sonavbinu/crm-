const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

//add employees

router.post("/add", async (req, res) => {
  console.log("post/add hit");
  console.log(req.body);
  try {
    const { name, position, since, salary, countryId, stateId, cityId } =
      req.body;
    console.log("body:", req.body);
    console.log("userid:", req.body.userId);

    const employee = new Employee({
      name,
      position,
      since,
      salary,
      countryId,
      stateId,
      cityId,
    });
    await employee.save();

    res.status(201).json({
      success: true,
      message: "Employee added successfully",
      employee,
    });
  } catch (error) {
    console.log("Employee create error:");
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("countryId")
      .populate("stateId")
      .populate("cityId");

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const employee = await Employee.findOne({
      userId: req.params.userId,
    });

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json(employee);
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
  console.log("ID:", req.params.id);
  console.log("BODY:", req.body);
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    console.log(updatedEmployee);
    res.status(200).json(updatedEmployee);
  } catch (error) {
    console.log(error);
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
