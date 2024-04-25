const mongoose = require("mongoose");

const schoolClasses = new mongoose.Schema({
  className: {
    type: String,
    required: true,
  },
  feeInfo: [],
  schoolID: {
    type: mongoose.Types.ObjectId,
    ref: "school",
    required: true,
  },
  classTeacher: String,
});

const ClassModel =
  mongoose.model.class_names || mongoose.model("class_names", schoolClasses);

module.exports = ClassModel;
