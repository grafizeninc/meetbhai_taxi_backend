const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  airportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AvailableAirportInDestination",
    required: [true, "Please fill  Airport"],
  },
  destinationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    required: [true, "Please fill Destination"],
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
}); 

const AirportBooking = mongoose.model("AirportBooking", bookingSchema);
module.exports = AirportBooking;
