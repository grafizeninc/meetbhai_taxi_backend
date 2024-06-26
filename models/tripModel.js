const mongoose = require("mongoose");

const tripsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "Please fill Trip type"],
  },
  pickUpPoint: {
    type: String,
    required: [true, "Please fill Trip Pick UP Point"],
  },
  dropPoint: {
    type: String,
    required: [true, "Please fill Trip Drop Point"],
  },
  vehicleType: {
    type: String,
    required: [true, "Please fill Vehicle Type"],
  },
  baseFare: {
    type: String,
    required: [true, "Please fill Base Fare"],
  },
  baseCoveredKM: {
    type: String,
    default: "",
  },
  coveredHours: {
    type: String,
    default: "",
  },
  nightCharge: {
    type: String,
    default: "",
  },
  driverCharge: {
    type: String,
    default: "",
  },
  extraHours: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const Trips = mongoose.model("Trips", tripsSchema);
module.exports = Trips;
