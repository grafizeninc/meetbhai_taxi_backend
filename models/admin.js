const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill your name"],
  },
  email: {
    type: String,
    required: [true, "Please fill your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, " Please provide a valid email"],
  },
  address: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please fill your password"],
    minLength: 6,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please fill your password confirm"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Your password and confirmation password are not the same",
    },
  },
  phoneNumber: {
    type: String,
    required: [true, "Please fill your Phone Number"],
  },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RolePermission"
    // type: String,
    // enum: ["superadmin", "admin"],
    // default: "admin",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

adminSchema.methods.correctPassword = async function (
  typedPassword,
  originalPassword
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;
