const mongoose = require("mongoose");

const DestinationSchema = new mongoose.Schema({
  airportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AvailableAirportInDestination",
    required: [true, "Please fill Destination ID"],
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
    seat: {
      type: String,
      required: [false, "Please fill seat"],
    },
    waterBottle:{
      type: String,
      required: [false, "Please fill waterBottle"],
    },
    fuelType:{
      type: String,
      required: [false, "Please fill fuel type"],
    },
    ac:{
      type: String,
      required: [false, "Please fill AC"],
    },
    carrier:{
      type: String,
      required: [false, "Please fill carrier"],
    },
  }],
  fileType: {
    type: String,
  },
  tags: {
    type: Array,
    default: [],
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

const Destination = mongoose.model(
  "Destination",
  DestinationSchema
);
module.exports = Destination;
