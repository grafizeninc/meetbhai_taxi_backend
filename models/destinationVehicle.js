const mongoose = require("mongoose");

const DestinationVehicleVehicleSchema = new mongoose.Schema({
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: [true, "Please fill Destination ID"],
  },
  airportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: [true, "Please fill Destination Airport"],
  },
  name: {
    type: String
  },
  vehicles: [{
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Please fill Vehicle Category"],
    },
    price: {
      type: String,
      required: [true, "Please fill price"],
    },
  }],
  tags: {
    type: Array,
    default: [""],
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
});

const DestinationVehicle = mongoose.model(
  "DestinationVehicle",
  DestinationVehicleVehicleSchema
);
module.exports = DestinationVehicle;
