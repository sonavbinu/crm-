const express = require("express");
const router = express.Router();
const State = require("../models/State");

//add state
router.post("/add", async (req, res) => {
  try {
    const { name, code } = req.body;

    const state = new State({
      name,
      code,
    });
    await state.save();

    res.status(201).json({
      success: true,
      message: "State added ",
      state,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get state
router.get("/", async (req, res) => {
  try {
    const state = await State.find();
    res.status(200).json(state);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//test
router.get("/test", (req, res) => {
  res.send("state route working");
});

//update country
router.put("/:id", async (req, res) => {
  try {
    const updatedState = await State.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );
    res.status(200).json(updatedState);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete employee
router.delete("/:id", async (req, res) => {
  try {
    await State.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "state deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
