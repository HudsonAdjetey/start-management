const asyncHandler = require("express-async-handler");
const SchoolModel = require("../model/schoolModel");
const StudentModel = require("../model/studentModel");
const ClassModel = require("../model/classModel");

// GET ALL STUDENTS
// @desc - public
// @route - /api-bill/student-system/students

const getAllStudents = asyncHandler(async (req, res) => {
  try {
    // check if school exist
    const existingSchool = await SchoolModel.find({ _id: req.query.schoolID });
    if (!existingSchool) {
      return res.status(404).json({
        message: "Not found",
        success: false,
      });
    }
    // get all students
    const getAllStudents = await StudentModel.find({
      schoolID: req.query.schoolID,
    });
    if (!getAllStudents || !req.query.schoolID) {
      return res.status(404).json({
        message: "No student found",
        success: "failed",
      });
    }
    res.status(200).json({
      success: true,
      message: "Students fetched",
      count: getAllStudents.length,
      data: getAllStudents,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
});

// GET INDIVIDUAL STUDENT
// @desc - public
// @route - /api-bill/student-system/student/:id
const getStudentByID = asyncHandler(async (req, res) => {
  let id = req.params.id;
  try {
    const student = await StudentModel.findOne({
      _id: id,
      schoolID: req.query.schoolID,
    });
    if (student) {
      return res.status(200).json({
        success: true,
        message: "Successfully fetched",
        student,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }
  } catch (error) {
    console.log("Error in getting the student");
    return res.status(500).json({
      success: false,
      error: error.message || "Internal Server Error",
    });
  }
});

// REGISTER STUDENTS
// @desc - public
// @route - /api-bill/student-system/register-student

const registerStudent = asyncHandler(async (req, res) => {
  try {
    // check if the user has permission has an admin
    const adminUser = req.user;
    if (!adminUser) {
      return res.status(402).json({
        success: false,
        message: "Unauthorized",
      });
    }
    const findSchool = await SchoolModel.findOne({ _id: req.body.schoolID });
    if (!findSchool) {
      return res.status(404).json({
        success: false,
        message: "School not Found",
      });
    }
    const newStudent = new StudentModel(req.body);

    // Assign a class dynamically
    const classes = await ClassModel.find({
      schoolID: req.body.schoolID,
    }).select("-__v");
    const matchingClasses = classes.find((cl) => {
      return cl.className === req.body.className;
    });
    if (!matchingClasses) {
      return res.status(404).json({
        success: false,
        message: `Class ${req.body.className} Not found`,
      });
    }

    // check if there's already a fee from the feeModel, add if its true
    newStudent.classID = matchingClasses._id;
    newStudent.schoolID = req.body.schoolID;

    if (matchingClasses.feeInfo) {
      newStudent.feeData = matchingClasses.feeInfo;
    } else {
      newStudent.feeData = [];
    }
    // save the new student to the database
    const savedStudent = await newStudent.save();
    res.status(201).json({
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(`Error: ${error.message}`);
  }
});

// UPDATE STUDENTS
// @desc - public
// @route - /api-bill/student-system/update-student/:id
const updatingStudent = asyncHandler(async (req, res) => {
  const id = req.params.id;
  try {
    // check if student exist
    const existingStudent = await StudentModel.findOne({
      _id: id,
      schoolID: req.query.schoolID,
    });
    if (!existingStudent) {
      return res
        .status(404)
        .json({ success: false, message: "student not found" });
    }
    // update the data of the student
    const updateStudent = await StudentModel.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();

    if (updateStudent) {
      res.status(200).json({
        success: true,
        updatedStudent: updateStudent,
      });
    } else {
      return res.status(400).json({
        success: false,
      });
    }
  } catch (error) {}
});
/* 
// DEACTIVATE STUDENTS
// @desc - public
// @route - /api-bill/student-system/deactivate-student/:id
const deActivatingStudent = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const id = req.params.id;
    const schoolID = req.query.schoolID;
    const findSchool = await SchoolModel.findOne({ id: schoolID });
    if (!findSchool) {
      return res.status(404).json({
        message: "Invalid Credentials",
      });
    }
  
    const updateStatus = await StudentModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!updateStatus) {
      return res.status(400).json({
        message: "Update Failed",
      });
    }
    res.status(201).json({
      message: "updated",
      status: "Success",
    });
  }); */

// CREATE A NEW CLASS
// @desc - private
// @route - /api-bill/student-system/create-class/:schoolID
const createClass = asyncHandler(async (req, res) => {
  try {
    const { className, classTeacher } = req.body;
    const schoolID = req.params.schoolID;
    const schoolPresent = await SchoolModel.findOne({ _id: schoolID });

    if (!schoolPresent) {
      return res.status(404).json({
        success: false,
        message: "No such school present",
      });
    }
    // check if theres an existing class
    const existingClassName = await ClassModel.findOne({
      className: className,
      schoolId: schoolID,
    });

    const newClass = await ClassModel.create({
      className,
      schoolID,
      classTeacher,
    });
    if (existingClassName) {
      return res.status(409).send("This class already exists");
    }
    const registeredClass = await newClass.save();
    if (!registeredClass) {
      return res.status(400).json({
        message: "Error creating the Class",
        status: "fail",
      });
    }

    res.status(201).json({
      message: "New class created",
      data: registeredClass,
      status: "success",
      data: registeredClass,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = {
  getAllStudents,
  registerStudent,
  getStudentByID,
  updatingStudent,
  createClass,
};
