const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
/* CREATE A USER SCHEMA */
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
  },
  isUserActive: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    enum: ["admin", "editor"],
  },
  pagePermission: {
    feeType: {
      type: Boolean,
      default: true,
    },
    registerStudent: {
      type: Boolean,
      default: true,
    },

    feeAssign: {
      type: Boolean,
      default: true,
    },

    history: {
      type: Boolean,
      default: true,
    },
    payment: {
      default: true,
      type: Boolean,
    },
    classRegister: {
      type: Boolean,
      default: true,
    },
  },
  loginID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "school",
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(this.password, enteredPassword);
};

const UserModel = mongoose.model.users || mongoose.model("users", userSchema);

module.exports = UserModel;
