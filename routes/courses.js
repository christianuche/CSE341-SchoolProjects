const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courses");
const isAuthenticated = require("../middleware/auth");

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourse);
router.post("/", isAuthenticated, courseController.createCourse);
router.put("/:id", isAuthenticated, courseController.updateCourse);
router.delete("/:id", isAuthenticated, courseController.deleteCourse);

module.exports = router;
