const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({

  airportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: [true, "Please fill Destination Airport"],
  },

});

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
