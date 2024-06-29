const Booking = require("../models/hourlyRentalbooking");
const mainBooking = require("../models/booking");
const base = require("./base");

exports.createBooking = async (req, res, next) => {
  try {
    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();

    await mainBooking.create({userId: savedBooking.user, hourlyRentalBookingId: savedBooking._id, bookingType: "hourlyRental"});

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
    if (!req.body.status) {
      return res.status(400).json({ status: "fail", message: "Status is required... " })
    }
    const booking = await Booking.findById(req.params.id);
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
    const booking = await Booking.findById(req.params.id);
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

exports.deleteBooking =  async (req, res, next) => {
  try {
    const doc = await Booking.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({status: 'fail', message: 'No document found with that id'});
    }

    await mainBooking.findOneAndDelete({ airportBookingId: req.params.id });

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
