const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  className: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
  },
  dateOfBirth: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  emgContactNumber: {
    type: Number,
    required: true,
  },
  emgContactName: {
    type: String,
    required: true,
  },
  feeData: [],
  classID: {
    type: mongoose.Types.ObjectId,
    ref: "class_Names",
    required: true,
    // referencing to the class model
  },
  schoolID: {
    type: mongoose.Types.ObjectId,
    ref: "school_systems",
    required: true,
  },
  bloodGroup: {
    type: String,
  },
  allergies: [],
});
// Creating student model
const StudentModel =
  mongoose.model.students || mongoose.model("students", studentSchema);

module.exports = StudentModel;
