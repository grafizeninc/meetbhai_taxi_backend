const Booking = require("../models/booking");
const User = require("../models/user");
const Airport = require("../models/airport");
const Destination = require("../models/destination");
const Vehicle = require("../models/vehicle");
const VehicleModel = require("../models/vehicleModel");
const City = require("../models/city");
const LocalPackage = require("../models/localHourlyPackages");
const hourlyRental = require("../models/hourlyRental");
const AirportBooking = require("../models/airportBooking");
const LocalAirportBooking = require("../models/localAirportBooking");
const OutStationBooking = require("../models/outStationBooking");
const HourlyRentalBooking = require("../models/hourlyRentalbooking");

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
    const userId = req.query.userId;
    const categoryId = req.query.categoryId;

    // airport
    const destinationId = req.query.destinationId;
    const airportId = req.query.airportId;

    // local airport package & hourly rental
    const cityId = req.query.cityId;
    const packageId = req.query.packageId;

    let finalData = { fareAmount: 0, coveredKms: 0}
    if (userId) {
      finalData.user = await User.findById(userId);
    }

    if (categoryId) {
      finalData.category = await Vehicle.findById(categoryId);

      if (finalData.category) {
        finalData.vehicleDetail = await VehicleModel.findOne({category: finalData.category});
      }
    }

    if (destinationId) {
      finalData.destination = await Destination.findById(destinationId);
    }

    if (airportId) {
      finalData.airport = await Airport.findById(airportId);
    }

    if (cityId) {
      finalData.city = await City.findById(cityId);
    }

    if (packageId) {
      const localPackageData = await LocalPackage.findById(packageId);
      if (localPackageData) {
        finalData.localPackage = localPackageData;
      }

      let hourlyRentalData = await hourlyRental.findById(packageId);
      if (hourlyRentalData) {
        finalData.hourlyRental = hourlyRentalData;
      }
    }

    res.status(200).json({
      status: "success",
      data: finalData
    });
  } catch (err) {
    next(err);
  }
};

exports.getBookingReceipt = async (req, res, next) => {
  try {
    const bookingId = req.query.bookingId;

    let data = {}
    data.fareAmount = 0;
    data.paymentType = '';
    data.totalPayableAmount = 0;
    data.paymentStatus = '';
    data.gstNumber = '';

    const airportBooking = await AirportBooking.findById(bookingId).populate("user airportId destinationId categoryId");
    if (airportBooking) {
      data.vehicleDetail = await VehicleModel.findOne({category: airportBooking.categoryId});
      data.airport = await Airport.findById(airportBooking.airportId);
      // data.airport = airportBooking.airportId;
      data.user = airportBooking.user;
      data.categoryName = airportBooking.categoryId.categoryName;
      data.destination = airportBooking.destinationId;
    }

    const localAirportBooking = await LocalAirportBooking.findById(bookingId).populate("user packageId cityId categoryId")
    if (localAirportBooking) {
      data.user = localAirportBooking.user;
      data.package = localAirportBooking.packageId;
      data.city = localAirportBooking.cityId;
      data.categoryName = localAirportBooking.categoryId.categoryName;
      data.vehicleDetail = await VehicleModel.findOne({category: localAirportBooking.categoryId});
    }

    const hourlyRentalBooking = await HourlyRentalBooking.findById(bookingId).populate("user packageId cityId categoryId")
    if (hourlyRentalBooking) {
      data.user = hourlyRentalBooking.user;
      data.package = hourlyRentalBooking.packageId;
      data.city = hourlyRentalBooking.cityId;
      data.categoryName = hourlyRentalBooking.categoryId.categoryName;
      data.vehicleDetail = await VehicleModel.findOne({category: hourlyRentalBooking.categoryId});
    }

    const outStationBooking = await OutStationBooking.findById(bookingId).populate("user cityId categoryId")
    if (outStationBooking) {
      data.user = outStationBooking.user;
      data.city = outStationBooking.cityId;
      data.categoryName = outStationBooking.categoryId.categoryName;
      data.vehicleDetail = await VehicleModel.findOne({category: outStationBooking.categoryId});
    }

    res.status(200).json({
      status: "success",
      data: data
    });
  } catch (err) {
    next(err);
  }
};