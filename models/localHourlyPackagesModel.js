const mongoose = require("mongoose");

const localHourlyPackagesSchema = new mongoose.Schema({
  location: {
    type: String,
    required: [true, "Please fill Local Hourly Package Location"],
  },
  time: {
    type: String,
    required: [true, "Please fill Local Hourly Package Total Time"],
  },
  kms: {
    type: String,
    required: [true, "Please fill Local Hourly Package Total Kms"],
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
  innovaCrysta: {
    type: String,
    default: "",
  },
  tempoTr: {
    type: String,
    default: "",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const LocalHourlyPackages = mongoose.model(
  "LocalHourlyPackages",
  localHourlyPackagesSchema
);
module.exports = LocalHourlyPackages;
