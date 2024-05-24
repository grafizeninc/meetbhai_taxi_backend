const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please fill Destination LandMark Name"],
      },
//   airportId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Airport",
//     required: [false, "Please fill Destination Airport"],
//   },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },

});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
