const mongoose = require("mongoose");

const airportSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill Airport name"],
  },
  code: {
    type: String,
    required: [true, "Please fill Airport Short Code"],
    unique: true,
  },
  cityName: {
    type: String,
    required: [true, "Please fill Airport City"],
  },
  destinationActive: {
    type: Boolean,
    default: false,
    required: false,
  },
  fileType: {
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
  active: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

const Airport = mongoose.model("Airport", airportSchema);
module.exports = Airport;
