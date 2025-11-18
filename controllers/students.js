const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

// GET all students
const getAllStudents = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const db = mongodb.getDb();
    const result = await db.collection("students").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// GET single student by ID
const getStudent = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const studentId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db.collection("students").findOne({ _id: studentId });
    res.setHeader("Content-Type", "application/json");
    if (!result) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
};

// Create a new student
const createStudent = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const { firstName, lastName, age, gender, email, birthday } = req.body;

    // Validation
    if (!firstName || !lastName || !age || !gender || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const student = { firstName, lastName, age, gender, email, birthday };

    const db = mongodb.getDb();
    const response = await db.collection("students").insertOne(student);

    res.status(201).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error!!!" });
  }
};

// Update student
const updateStudent = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const studentId = new ObjectId(req.params.id);
    const { firstName, lastName, age, gender, email, birthday } = req.body;

    // Validation
    if (!firstName || !lastName || !age || !gender || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const student = { firstName, lastName, age, gender, email, birthday };

    const db = mongodb.getDb();
    const response = await db.collection("students").updateOne(
      { _id: studentId },
      { $set: student } // <-- $set fixes the "Update document requires atomic operators" error
    );

    if (response.matchedCount === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const studentId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const response = await db.collection("students").deleteOne({ _id: studentId });

    if (response.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found." });
    }

    res.status(200).json({ message: "Student deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { 
  getAllStudents, 
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent 
};
