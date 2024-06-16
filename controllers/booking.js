const Booking = require("../models/booking");
const User = require("../models/user");
const Airport = require("../models/airport");
const DestinationVehicle = require("../models/destinationVehicle");
const Vehicle = require("../models/vehicle");
const VehicleModel = require("../models/vehicleModel");
const City = require("../models/city");
const LocalPackage = require("../models/localHourlyPackages");
const hourlyRental = require("../models/hourlyRental");
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
    const destinationVehicleId = req.query.destinationVehicleId;
    const airportId = req.query.airportId;

    // local airport package & hourly rental
    const cityId = req.query.cityId;
    const packageId = req.query.packageId;

    let finalData = {}
    if (userId) {
      finalData.user = await User.findById(userId);
    }

    if (categoryId) {
      finalData.category = await Vehicle.findById(categoryId);

      if (finalData.category) {
        finalData.vehicleDetail = await VehicleModel.findOne({category: categoryId});
      }
    }

    if (destinationVehicleId) {
      finalData.destinationVehicle = await DestinationVehicle.findById(destinationVehicleId);
    }

    if (airportId) {
      finalData.airport = await Airport.findById(destinationVehicleId);
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