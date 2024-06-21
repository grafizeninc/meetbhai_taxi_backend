const base = require("./base");
const booking = require("../models/booking");
const mongoose = require('mongoose');

exports.getDashboardDetails = async (req, res, next) => {
  try {
    const bookings = await booking.find({}).populate("userId airportBookingId hourlyRentalBookingId localAirportBookingId outStationBookingId").sort({createdAt: -1}).lean();

    const finalBooking = bookings.map(item => ({
      ...item,
      ...(item.airportBookingId? {status: item.airportBookingId.status, type: 'airport'} : {}),
      ...(item.hourlyRentalBookingId? {status: item.hourlyRentalBookingId.status, type: 'hourlyRental'} : {}),
      ...(item.localAirportBookingId? {status: item.localAirportBookingId.status, type: 'localAirport'} : {}),
      ...(item.outStationBookingId? {status: item.outStationBookingId.status, type: 'outStation'} : {}),
    }));

    const bookingCount = finalBooking.reduce((acc, current) => {
      const status = current.status;
      acc.total[status] = (acc.total[status] || 0) + 1;
      acc.byType[current.type][status] = (acc.byType[current.type][status] || 0) + 1;
      return acc;
    }, { total: {}, byType: { airport: {}, hourlyRental: {}, localAirport: {}, outStation: {} } });


    res.status(200).json({
      status: "success",
      bookingCount
    });
  } catch (err) {
    next(err);
  }
};
