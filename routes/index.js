const express = require("express");
const router = express.Router();

// Swagger documentation route
router.use("/api-docs", require("./swagger"));

// API Entities
router.use("/students", require("./students"));
router.use("/courses", require("./courses"));

// Optional simple homepage for API
router.get("/home", (req, res) => {
  res.send("Welcome to the School API!");
});

module.exports = router;
