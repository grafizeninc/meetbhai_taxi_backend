const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  expireTime: {
    type: Date,
    // required: true
  }
}, {
  autoCreate: true,
  timestamps: true
});

const Otp = mongoose.model("Otp", otpSchema);
module.exports = Otp;
