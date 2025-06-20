// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from "public" folder
app.use(express.static(path.join(__dirname, "public")));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    // These are now optional in latest versions
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Student model
const Student = require("./models/Student");

// Routes

// Get all students
app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a student by ID
app.get("/api/students/:id", async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new student
app.post("/api/students", async (req, res) => {
  try {
    const { name, course } = req.body;
    const newStudent = new Student({ name, course });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a student
app.put("/api/students/:id", async (req, res) => {
  try {
    const { name, course } = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { name, course },
      { new: true }
    );
    if (!updatedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a student
app.delete("/api/students/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent)
      return res.status(404).json({ message: "Student not found" });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Default route (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});