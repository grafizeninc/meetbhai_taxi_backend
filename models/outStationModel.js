const mongoose = require("mongoose");

const OutStationSchema = new mongoose.Schema({
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: [true, "Please fill State"],
  },
  pricesPerKm: [{
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vehicle",
      required: [true, "Please provide Vehicle category"],
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
    }
  }]
});

const OutStation = mongoose.model("OutStation", OutStationSchema);
module.exports = OutStation;
