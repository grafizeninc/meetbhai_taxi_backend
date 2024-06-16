const Booking = require("../models/booking");
const base = require("./base");

exports.getBookingList = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}).populate("userId airportBookingId hourlyRentalBookingId localAirportBookingId outStationBookingId").sort({createdAt: -1});

    res.status(200).json({
      status: "success",
      data: { bookings },
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookingsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const bookings = await Booking.find({ userId: userId }).populate("userId airportBookingId hourlyRentalBookingId localAirportBookingId outStationBookingId");
      res.status(200).json({
          status: "success",
          data: { bookings }
      });
  } catch (err) {
    next(err);
  }
};

exports.getBookingSummery = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const categoryId = req.query.categoryId;
    const bookingId = req.query.bookingId;

    res.status(200).json({
      status: "success",
      data: { }
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookingConfirmationDetails = async (req, res, next) => {
  try {
    const bookingId = req.params.id;


    res.status(200).json({
      status: "success",
      data: {  }
    });
  } catch (err) {
    next(err);
  }
};