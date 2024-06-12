const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: [true, "Please fill City"],
  },
  packageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HourlyRental",
    required: true,
  },
  pickupDate: {
    type: Date,
    required: true,
  },
  pickupTime: {
    type: String,
    required: true,
  },
  driverDetails: {
    driverName: {
      type: String,
    },
    driverPhoneNumber: {
      type: String,
    },
  },
  status: {
    type: String,
    enum: ["pending", "accepted", "assigned", "completed"],
    default: "pending",
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    required: [true, "Please fill Vehicle Category"],
  },
  km: {
    type: String,
    default: "",
  },
  price: {
    type: String
  }
});

const Booking = mongoose.model("HourlyRentalBooking", bookingSchema);
module.exports = Booking;
