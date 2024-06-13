const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill Destination Name"],
  },
  airportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: [true, "Please fill Destination Airport"],
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
  // tags: {
  //   type: Array,
  //   default: [""],
  // },
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

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
