const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({

  airportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: [true, "Please fill Destination Airport"],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },

});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
