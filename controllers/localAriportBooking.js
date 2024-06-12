const Booking = require("../models/localAirportBooking");
const base = require("./base");

exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json({
      status: "success",
      data: { booking: savedBooking },
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookingList = async (req, res, next) => {
  try {
    const bookings = await Booking.find({}).populate("user");
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
    const bookings = await Booking.find({ user: userId }).populate("user");
      res.status(200).json({
          status: "success",
          data: { bookings }
      });
  } catch (err) {
    next(err);
  }
};

exports.acceptBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    booking.status = "accepted";
    if (req.body.addDriverDetails) {
      booking.driverDetails.driverName = req.body.driverName;
      booking.driverDetails.driverPhoneNumber = req.body.driverPhoneNumber;
      booking.status = "assigned";
    }
    await booking.save();
    res.status(200).json({
      status: "success",
      data: { booking },
    });
  } catch (err) {
    next(err);
  }
};

exports.assignDriver = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    booking.driverDetails.driverName = req.body.driverName;
    booking.driverDetails.driverPhoneNumber = req.body.driverPhoneNumber;
    booking.status = "assigned";
    await booking.save();
    res.status(200).json({
      status: "success",
      data: { booking },
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteBooking = base.deleteOne(Booking);
