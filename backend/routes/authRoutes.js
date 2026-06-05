const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const { register, login, getMe } = require("../controller/authController");

router.post("/register", register);
router.post("/login", login);

router.get("/me", authMiddleware, getMe);

router.get("/test", (req, res) => {
  res.send("Auth route working");
});

module.exports = router;
