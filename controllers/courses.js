const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

// GET all contacts
const getAllCourses = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const db = mongodb.getDb();
    const result = await db.collection("courses").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET student single contact by ID
const getCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db.collection("courses").findOne({ _id: contactId });
    res.setHeader("Content-Type", "application/json");
    if (!result) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
};

// Create a new course contact
const createCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const contact = {
      courseCode: req.body.courseCode,
      title: req.body.title,
      units: req.body.units,
      department: req.body.department,
      semester: req.body.semester,
      description: req.body.description
    };

    const db = mongodb.getDb(); // ✅ no .db()
    const response = await db.collection("courses").insertOne(contact);

    //Validation to check if the student was created
    if (!courseCode || !department ) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    res.status(201).json(response);
  } catch {
    res.status(500).json({ error: "Server error!!!" });
  }
};

// Update students data
const updateCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const userId = new ObjectId(req.params.id);
    const course = {
      courseCode: req.body.courseCode,
      title: req.body.title,
      units: req.body.units,
      department: req.body.department,
      semester: req.body.semester,
      description: req.body.description
    };

    const db = mongodb.getDb();
    const response = await db.collection("courses").replaceOne({ _id: userId }, course);

    if (response.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Contact not found." });
    } 
    } catch (err) {
    res.status(500).json({ message: err.message });
  } 
};

// Delete a student record
const deleteCourse = async (req, res) => {
  //#swagger.tags=["Courses"]
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const response = await db.collection("courses").deleteOne({ _id: userId });

    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Student not found." });
    }
  } catch (err) {
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
