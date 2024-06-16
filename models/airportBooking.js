const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  airportId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Airport",
    required: [true, "Please fill Destination Airport"],
  },
  destinationVehicleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "DestinationVehicle",
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
  }
}, { timestamps: true });

const AirportBooking = mongoose.model("AirportBooking", bookingSchema);
module.exports = AirportBooking;
