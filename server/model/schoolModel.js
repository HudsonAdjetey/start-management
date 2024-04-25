const mongoose = require("mongoose");

/* SCHOOL SCHEMA */
const schoolSchema = new mongoose.Schema({
  schoolName: {
    type: String,
    required: true,
    unique: true,
  },
  profileImageName: Array,
  binary: Buffer,
  contentType: String,
  password: {
    type: String,
    required: true,
    default: "Admin",
  },
});

const SchoolModel =
  mongoose.model.school_systems ||
  mongoose.model("school_systems", schoolSchema);
module.exports = SchoolModel;
