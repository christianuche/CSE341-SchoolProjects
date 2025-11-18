const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courses");

router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourse);
router.post("/", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
