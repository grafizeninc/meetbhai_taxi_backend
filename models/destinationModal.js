const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please fill Destination  Name"],
      },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },

}, { timestamps: true });

const Destination = mongoose.model("Destination", destinationSchema);
module.exports = Destination;
