const mongoose = require("mongoose");

const LocalPackagesSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: [true, "Please fill City"],
  },
  packageName: {
    type: String,
    required: [true, "Please fill Local Package Name"],
  },
  // time: {
  //   type: String,
  //   required: [true, "Please fill Local Hourly Package Total Time"],
  // },
  // kms: {
  //   type: String,
  //   required: [true, "Please fill Local Hourly Package Total Kms"],
  // },
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
  active: {
    type: Boolean,
    default: true,
  },
  addedDate: {
    type: Date,
    required: false,
  },
  updatedDate: {
    type: Date,
    required: false,
  },
});

const LocalPackages = mongoose.model(
  "LocalPackages",
  LocalPackagesSchema
);
module.exports = LocalPackages;
