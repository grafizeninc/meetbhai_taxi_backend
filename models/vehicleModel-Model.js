const mongoose = require("mongoose");

const vehicleModelSchema = new mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: [true, "Please fill Vehicle Category"],
  },
  name: {
    type: String,
    required: [true, "Please fill Vehicle Model Name"],
  },
  seatSegment: {
    type: String,
    required: [true, "Please fill Vehicle Seat Segment"],
  },
  fuelType: {
    type: String,
    required: [true, "Please fill Vehicle Fuel Type"],
  },
  luggage: {
    type: String,
    required: [true, "Please fill Luggage"],
  },
  ac: {
    type: String,
    required: [true, "Please fill AC/No AC"],
  },
  waterBottle: {
    type: String,
    required: [true, "Please fill Water Bottle Field"],
  },
  carrier: {
    type: String,
    required: [true, "Please fill Carrier Field"],
  },
  addedDate: {
    type: Date,
    required: false
  },
  updatedDate: {
    type: Date,
    required: false
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const VehicleModel = mongoose.model("VehicleModel", vehicleModelSchema);
module.exports = VehicleModel;
