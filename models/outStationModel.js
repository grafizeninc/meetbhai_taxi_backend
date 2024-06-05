const mongoose = require("mongoose");

const OutStationSchema = new mongoose.Schema({
  stateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: [true, "Please fill State"],
  },
  hatchBackKm: {
    type: String,
    default: "",
  },
  sedanKm: {
    type: String,
    default: "",
  },
  suvKm: {
    type: String,
    default: "",
  },
  innovaKm: {
    type: String,
    default: "",
  },
  tempoKm: {
    type: String,
    default: "",
  }
});

const OutStation = mongoose.model("OutStation", OutStationSchema);
module.exports = OutStation;
