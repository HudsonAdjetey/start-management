const express = require("express");
const {
  registerAdminUser,
  loginUser,
} = require("../controllers/userController");
const userRouter = express.Router();

// @desc - register user
// @secure - public
// @method - POST

userRouter.post("/register", registerAdminUser);

// @desc - login user
// @secure - public
// @method - POST

userRouter.post("/login", loginUser);
module.exports = userRouter;
