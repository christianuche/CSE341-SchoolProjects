const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

// GET all courses
const getAllCourses = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const db = mongodb.getDb();
    const result = await db.collection("courses").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET single course by ID
const getCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const courseId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db.collection("courses").findOne({ _id: courseId });
    res.setHeader("Content-Type", "application/json");
    if (!result) {
      return res.status(404).json({ error: "Course not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
};

// Create a new course
const createCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const { courseCode, title, units, department, semester, description } = req.body;

    // Validation
    if (!courseCode || !department) {
      return res.status(400).json({ error: "Missing required fields: courseCode or department" });
    }

    const course = { courseCode, title, units, department, semester, description };

    const db = mongodb.getDb();
    const response = await db.collection("courses").insertOne(course);

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error!!!" });
  }
};

// Update course
const updateCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const courseId = new ObjectId(req.params.id);
    const { courseCode, title, units, department, semester, description } = req.body;

    // Validation
    if (!courseCode || !department) {
      return res.status(400).json({ error: "Missing required fields: courseCode or department" });
    }

    const course = { courseCode, title, units, department, semester, description };

    const db = mongodb.getDb();
    const response = await db.collection("courses").updateOne(
      { _id: courseId },
      { $set: course } // <-- $set is required for updateOne
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({ message: "Course updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a course
const deleteCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const courseId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const response = await db.collection("courses").deleteOne({ _id: courseId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({ message: "Course deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  getAllCourses, 
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse 
};
