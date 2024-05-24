const mongoose = require("mongoose");

const destinationLandMarkSchema = new mongoose.Schema({
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
  hatchBack: {
    type: String,
    default: "",
  },
  sedan: {
    type: String,
    default: "",
  },
  suv: {
    type: String,
    default: "",
  },
  innova: {
    type: String,
    default: "",
  },
  tempo: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const DestinationLandMark = mongoose.model("DestinationLandMark", destinationLandMarkSchema);
module.exports = DestinationLandMark;
