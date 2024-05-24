const mongoose = require("mongoose");

const DestinationVehicleVehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill Destination Vehicle Name"],
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: [true, "Please fill Destination ID"],
  },
  vehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: [true, "Please fill Vehicle Category"],
  },
  price: {
    type: String,
    required: [true, "Please fill Destination Vehicle Name"],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const DestinationVehicle = mongoose.model(
  "DestinationVehicle",
  DestinationVehicleVehicleSchema
);
module.exports = DestinationVehicle;
