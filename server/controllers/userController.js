const asyncHandler = require("express-async-handler");
const UserModel = require("../model/userModel");
const SchoolModel = require("../model/schoolModel");

/* REGISTER USER */
// the user to be registered should only carry a role as an admin
const registerAdminUser = asyncHandler(async (req, res) => {
  try {
    const { loginID, username, password, role } = req.body;
    // check if the schoolID exist
    const checkIfSchoolExists = await SchoolModel.findOne({ _id: loginID });
    if (!checkIfSchoolExists) {
      return res
        .status(401)
        .json({ msg: "The Login ID does not exist in our system." });
    }
    // check if there's already a user with those credentials
    const existingAdminUser = await UserModel.findOne({
      username: username,
      loginID: loginID,
    });
    if (existingAdminUser) {
      return res.status(400).json("This Login ID is already in use");
    }

    if (role !== "admin") {
      return res.status(400).json({
        success: "failed",
        msg: "User must be an admin",
      });
    }
    // Also check if there's already a user with the admin role
    const checkForAdminRole = await UserModel.findOne({
      loginID,
      role: "admin",
    });
    if (checkForAdminRole) {
      return res.status(403).json({
        msg: "Unauthorized",
      });
    }
    // validating usernames and other credentials
    const nameArray = username.split(" ");
    if (nameArray.length > 1) {
      return res
        .status(400)
        .send({ message: "Username should not contain spaces" });
    }
    if (typeof username == "number") {
      return res.status(404).json({ message: "Username cannot be numbers" });
    }
    if (!isNaN(username)) {
      return res.status(400).json({ message: "Username cannot be Numeric" });
    }

    const newAdminUser = await UserModel.create({
      loginID,
      password,
      role,
      username,
    });

    if (newAdminUser) {
      return res.status(201).json({
        success: true,
        msg: "New user created",
        data: {
          userIden: newAdminUser._id,
          schoolGen: newAdminUser.loginID,
          user: user.username,
        },
      });
    }
  } catch (error) {}
});

/* LOGIN USER */
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { loginID, password, username } = req.body;
    const findIfLoginIDExistInSchool = await SchoolModel.findOne({
      _id: loginID,
    });

    if (!findIfLoginIDExistInSchool) {
      return res.status(403).json({ msg: "No such school exist with that ID" });
    }
    // get the user from the DB using loginID
    // check if the username, password, schoolID and isUserActive are correct
    const user = await UserModel.findOne({
      loginID: loginID,
      username: username,
    });

    if (user && (await user.comparePassword)) {
      if (user.isUserActive !== true) {
        return res.status(403).json({
          msg: "Account is suspended",
        });
      }
      return res.status(200).json({
        success: true,
        msg: "Logged In",
        data: {
          userIden: user._id,
          schoolGen: user.loginID,
          user: user.username,
        },
      });
    } else {
      return res.status(403).json({ msg: "Invalid Credentials!" });
    }

    return res.status(404).json({
      success: "failed",
      msg: "Invalid Credentials",
    });
  } catch (error) {
    return res.status(500).json({
      ErrorStrength: "critical",
      msg: error.message || error,
    });
  }
});

module.exports = {
  registerAdminUser,
  loginUser,
};
