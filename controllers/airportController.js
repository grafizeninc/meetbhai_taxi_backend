const base = require("./baseController");
const Airport = require("../models/airportModel");
const Destination = require("../models/destinationModel");
const DestinationVehicle = require("../models/destinationVehicleModel");
const Vehicle = require("../models/vehicleModel");
const AppError = require("../utils/appError");

exports.getAll = base.getAll(Airport);
exports.getOne = base.getOne(Airport);
exports.update = base.updateOne(Airport);
exports.delete = base.deleteOne(Airport);
exports.add = async (req, res, next) => {
  try {
    const airport = await Airport.create({
      name: req.body.name,
      code: req.body.code,
      cityName: req.body.cityName,
      dateLogs: req.body.dateLogs,
    });

    res.status(201).json({
      status: "success",
      data: {
        airport,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Destination

exports.addDestination = async (req, res, next) => {
  try {
    const airport = await Airport.findById(req.body.airport);
    if (!airport) {
      return next(
        new AppError(401, "fail", "No Airport found with that id"),
        req,
        res,
        next
      );
    }
    let tags = req.body.tags;
    let tagsData = tags ? tags.split(",") : [""];
    await req.body;
    const destination = await Destination.create({
      name: req.body.name,
      tags: tagsData,
      airportId: req.body.airport,
    });

    res.status(201).json({
      status: "success",
      data: {
        destination,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.updateDestination = base.updateOne(Destination);
exports.updateDestinationTags = async (req, res, next) => {
  try {
    let tags = req.body.tags;
    let tagsData = tags ? tags.split(",") : [""];
    const doc = await Model.findByIdAndUpdate(
      req.params.id,
      {
        tags: tagsData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!doc) {
      return next(
        new AppError(404, "fail", "No Destination found with that id"),
        req,
        res,
        next
      );
    }

    res.status(200).json({
      status: "success",
      data: {
        doc,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getDestinationByAirport = async (req, res, next) => {
  try {
    const destination = await Destination.find({
      airportId: req.params.airport,
    });
    for (const d of destination) {
      if (d.airportId) {
        await d.populate("airportId").execPopulate();
      }
    }
    res.status(200).json({
      status: "success",
      destination,
    });
  } catch (err) {
    next(err);
  }
};

exports.getDestination = async (req, res, next) => {
  try {
    const airports = await Airport.find();

    const airportDestinationCount = await Promise.all(
      airports.map(async (airport) => {
        const destinationCount = await Destination.countDocuments({
          airportId: airport._id,
        });
        return {
          airportId: airport._id,
          airportName: airport.name,
          noOfDestination: destinationCount,
        };
      })
    );
    res.status(200).json({
      status: "success",
      destination: airportDestinationCount,
    });
  } catch (err) {
    next(err);
  }
};


// Destination Vehicles

exports.getAllDestinationVehicle = base.getAll(DestinationVehicle);
exports.getOneDestinationVehicle = base.getOne(DestinationVehicle);
exports.updateDestinationVehicle = base.updateOne(DestinationVehicle);
exports.deleteDestinationVehicle = base.deleteOne(DestinationVehicle);
exports.getvehicleByDestination = async (req, res, next) => {
  try {
    const destination = await DestinationVehicle.find({
      destinationId: req.params.destination,
    });
    for (const d of destination) {
      if (d.destinationId) {
        await d.populate("destinationId").execPopulate();
      }
    }
    res.status(200).json({
      status: "success",
      destination,
    });
  } catch (err) {
    next(err);
  }
};
exports.addDestinationVehicle = async (req, res, next) => {
  try {
    const destinationVehicle = await DestinationVehicle.create({
      destinationId: req.body.destinationId,
      vehicleId: req.body.vehicleId,
      price: req.body.price,
    });

    res.status(201).json({
      status: "success",
      data: {
        destinationVehicle,
      },
    });
  } catch (err) {
    next(err);
  }
};