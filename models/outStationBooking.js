const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fromCity: {
    type: String
  },
  toCity: [{
    type: String
  }],
  cityId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "City",
    required: [true, "Please fill City"],
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
    enum: ["pending", "accepted", "assigned", "completed", "cancelled"],
    default: "pending",
  },
  subType: {
    type: String,
    // enum: ["one-way", "round"],
    required: [true, "Please fill sub type"],
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
  addedDate: {
    type: Date,
    required: false,
  },
  updatedDate: {
    type: Date,
    required: false,
  },
  // price: {
  //   type: String
  // }
});

const Booking = mongoose.model("OutStationBooking", bookingSchema);
module.exports = Booking;
