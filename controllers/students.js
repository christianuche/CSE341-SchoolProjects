const mongodb = require("../database/connect");
const ObjectId = require("mongodb").ObjectId;

// GET all Students
const getAllStudents = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const db = mongodb.getDb();
    const result = await db.collection("students").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// GET student single contact by ID
const getStudent = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const contactId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db.collection("students").findOne({ _id: contactId });
    res.setHeader("Content-Type", "application/json");
    if (!result) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json(result);
  } catch (err) {
    res.status(400).json({ error: "Invalid ID format" });
  }
};

// // Create a new student contact
const createStudent = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      gender: req.body.gender,
      email: req.body.email,
      birthday: req.body.birthday,
    };

    const db = mongodb.getDb(); // ✅ no .db()
    const response = await db.collection("students").insertOne(student);

    //Validation to check if the student was created
    if (!firstName || !lastName || !age || !gender || !email) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    res.status(201).json(response);
  } catch {
    res.status(500).json({ error: "Server error!!!" });
  }
};

// Update students data
const updateStudent = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const userId = new ObjectId(req.params.id);
    const student = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      age: req.body.age,
      gender: req.body.gender,
      email: req.body.email,
      birthday: req.body.birthday,
    };

    const db = mongodb.getDb();
    const response = await db.collection("Students").replaceOne({ _id: userId }, student);

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
const deleteStudent = async (req, res) => {
  //#swagger.tags=["Students"]
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const response = await db.collection("students").deleteOne({ _id: userId });

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
  getAllStudents, 
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent 
};
