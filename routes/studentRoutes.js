// routes/studentRoutes.js
const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single student by ID
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create new student
router.post("/", async (req, res) => {
  try {
    const { name, course } = req.body;
    const newStudent = new Student({ name, course });
    const saved = await newStudent.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update student
router.put("/:id", async (req, res) => {
  try {
    const { name, course } = req.body;
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      { name, course },
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE student
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Student.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Student not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
