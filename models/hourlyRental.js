const mongoose = require("mongoose");

const hourlyRentalSchema = new mongoose.Schema({
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: [true, "Please fill City"],
  },
  packageName: {
    type: String
  },
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
    seat: {
      type: String,
      required: [false, "Please fill seat"],
    },
    waterBottle:{
      type: String,
      required: [false, "Please fill waterBottle"],
    },
    fuelType:{
      type: String,
      required: [false, "Please fill fuel type"],
    },
    ac:{
      type: String,
      required: [false, "Please fill AC"],
    },
    carrier:{
      type: String,
      required: [false, "Please fill carrier"],
    },
  }],
  // kms: {
  //   type: String,
  //   required: [true, "Please fill Hourly Rental Total Kms"],
  // },
  addedDate: {
    type: Date,
    required: false,
  },
  updatedDate: {
    type: Date,
    required: false,
  },
});

const hourlyRentals = mongoose.model(
  "HourlyRental",
  hourlyRentalSchema
);
module.exports = hourlyRentals;
