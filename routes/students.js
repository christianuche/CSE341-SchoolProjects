const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students");
//const validate = require("../middleware/validate");
const {isAuthenticated} = require("../middleware/auth");

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudent);
router.post("/", isAuthenticated, studentController.createStudent);
router.put("/:id", isAuthenticated, studentController.updateStudent);
router.delete("/:id", isAuthenticated, studentController.deleteStudent);

module.exports = router;
