const mongoose = require("mongoose");
const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  airportBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AirportBooking"
  },
  hourlyRentalBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HourlyRentalBooking"
  },
  localAirportBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LocalAirportBooking"
  },
  outStationBookingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OutStationBooking"
  },
  bookingType: {
    type: String
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

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
