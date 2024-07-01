const AirportBooking = require("../models/airportBooking");
const Booking = require("../models/booking");
const base = require("./base");

exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = new AirportBooking(req.body);
    const savedBooking = await newBooking.save();

    await Booking.create({ userId: savedBooking.user, airportBookingId: savedBooking._id, bookingType: "airport" });

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
    const bookings = await AirportBooking.find({}).populate('user airportId destinationId categoryId');
    
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
    const bookings = await AirportBooking.find({ user: userId }).populate("user");
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
    if (!req.body.status) {
      return res.status(400).json({ status: "fail", message: "Status is required... " })
    }
    const booking = await AirportBooking.findById(req.params.id);
    booking.status = req.body.status;

    await booking.save();
    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (err) {
    next(err);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    const booking = await AirportBooking.findById(req.params.id);
    booking.status = "cancelled";
    await booking.save();
    res.status(200).json(" Booking Cancle Successfully ");
  }
  catch(err) {
    next(err);
  }
};


exports.assignDriver = async (req, res, next) => {
  try {
    const booking = await AirportBooking.findById(req.params.id);
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

exports.deleteBooking = async (req, res, next) => {
  try {
    const doc = await AirportBooking.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({ status: 'fail', message: 'No document found with that id' });
    }

    await Booking.findOneAndDelete({ airportBookingId: req.params.id });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
