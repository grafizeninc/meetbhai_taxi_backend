const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pickupLocation: {
    type: String,
    required: true,
  },
  dropoffLocation: {
    type: String,
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
  bookingType: {
    type: String
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
    type: String,
    required: [true, "Please fill price"],
  },
  subType: {
    type: String,
    default: "",
  }
});

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
