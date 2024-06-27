const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
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
  role: {
    type: String,
    enum: ["user", "driver"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
  referCode: {
    type: String
  },
  walletAmount: {
    type: Number,
    default: 0
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  }, 
  billingName: {
    type: String,
  },
  GSTNumber: {
    type: String,
  },
  profileImage: {
    type: String,
  },
  addedDate: {
    type: Date,
    required: false,
  },
  updatedDate: {
    type: Date,
    required: false,
  },
  verifiedUser: {
    type: Boolean,
    default: false,
    required: false,
  },
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  typedPassword,
  originalPassword
) {
  return await bcrypt.compare(typedPassword, originalPassword);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
