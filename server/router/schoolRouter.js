const express = require("express");
const {
  getAllStudents,
  registerStudent,
  getStudentByID,
  updatingStudent,
  createClass,
} = require("../controllers/systemController");
const { registerEditor } = require("../middleware/userRole");

const schoolRoute = express.Router();
// all students
schoolRoute.get("/students", getAllStudents);
// register students
schoolRoute.post("/register-student", registerEditor, registerStudent);
// get a student
schoolRoute.get("/student/:id", getStudentByID);
// update a student
schoolRoute.put("/update-student/:id", updatingStudent);
// create class
schoolRoute.post("/create-class/:schoolID", createClass);

module.exports = schoolRoute;
