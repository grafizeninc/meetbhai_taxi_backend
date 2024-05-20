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
  dateLogs: {
    type: String,
    required: [true, "Please fill Airport Date Log"]
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const Airport = mongoose.model("Airport", airportSchema);
module.exports = Airport;
