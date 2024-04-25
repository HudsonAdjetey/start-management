const UserModel = require("../model/userModel");

const registerEditor = async function (req, res, next) {
  // in the future use the cookies to check if the user has that role as an admin or editor to the register student page
  try {
    const findUser = await UserModel.findOne({
      _id: req.query.userID,
      isUserActive: true,
    });
    if (findUser) {
      // check if the user has a login role as an admin or an editor :todo ==> if the login role is an editor with the register student page permission as true

      const userHasPermission = findUser.pagePermission.registerStudent;
      if (userHasPermission) {
        req.user = findUser;
        return next();
      }
    }
    return res.status(401).json({
      message: "You are not authorized to perform this action",
    });
  } catch (error) {
    console.log(`[ERROR]: ${error.message}`);
  }
};

module.exports = { registerEditor };
