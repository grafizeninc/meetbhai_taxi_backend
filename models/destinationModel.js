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
  tags: {
    type: Array,
    default: [""],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
