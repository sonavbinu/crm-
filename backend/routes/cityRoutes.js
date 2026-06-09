const express = require("express");
const router = express.Router();
const City = require("../models/City");

//add city
router.post("/add", async (req, res) => {
  try {
    const { name, code, stateId } = req.body;

    const city = new City({
      name,
      code,
      stateId,
    });
    await city.save();

    res.status(201).json({
      success: true,
      message: "City added",
      city,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//get city
router.get("/", async (req, res) => {
  try {
    const city = await City.find();
    res.status(200).json(city);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

r;

//test
router.get("/test", (req, res) => {
  res.send("city route working");
});

router.get("/state/:stateId", async (req, res) => {
  const cities = await City.find({
    stateId: req.params.stateId,
  });
  res.json(cities);
});
//update city
router.put("/:id", async (req, res) => {
  try {
    const updatedCity = await City.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedCity);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

//delete city
router.delete("/:id", async (req, res) => {
  try {
    await City.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: "city deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
