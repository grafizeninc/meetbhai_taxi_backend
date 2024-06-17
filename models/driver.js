const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill name"],
  },
  mobileNumber: {
    type: Number,
    required: [true, "Please fill mobile number"],
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamp: true });

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;
