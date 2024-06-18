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
  rcBook: {
    type: String
  },
  licence: {
    type: String
  },
  insurance: {
    type: String
  },
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Driver = mongoose.model("Driver", driverSchema);
module.exports = Driver;
