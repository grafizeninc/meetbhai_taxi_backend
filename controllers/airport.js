const base = require("./base");
const Airport = require("../models/airport");
const AvailableAirportInDestination = require("../models/availableAirportInDestination");
const Destination = require("../models/destination");
const VehicleModel = require("../models/vehicleModel");
const AppError = require("../utils/appError");
const Vehicle = require("../models/vehicle");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const csv = require('csvtojson');
const xlsx = require('xlsx');
const path = require('path');

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
      addedDate: new Date(),
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

exports.addAvailableAirportInDestination = async (req, res, next) => {
  try {
    const airport = await Airport.findById(req.body.airportId);
    if (!airport) {
      return next(
        new AppError(401, "fail", "No Airport found with that id"),
        req,
        res,
        next
      );
    }

    const checkDestinationAirportExist = await AvailableAirportInDestination.find({ airportId: req.body.airport }).lean();
    if (!checkDestinationAirportExist) {
      return next(
        new AppError(401, "fail", "Airport already exist"),
        req,
        res,
        next
      );
    }
    airport.destinationActive = true;
    await airport.save();
    await req.body;
    const availableAirport = await AvailableAirportInDestination.create({
      airportId: req.body.airportId,
      addedDate: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: {
        availableAirport,
      },
    });
  } catch (err) {
    next(err);
  }
};

// exports.updateDestination = base.updateOne(Destination);
exports.updateDestinationTags = async (req, res, next) => {
  try {
    let tags = req.body.tags;
    let tagsData = tags ? tags.split(",").map(tag => tag.trim()) : [];
    const doc = await Destination.findByIdAndUpdate(
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
        new AppError(404, "fail", "No Destination Vehicle found with that id"),
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



exports.getAvailableAirportInDestination = async (req, res, next) => {
  try {
    const airports = await Airport.find();

    const airportDestinationCount = await Promise.all(
      airports.map(async (airport) => {
        const destinationCount = await AvailableAirportInDestination.countDocuments({
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

exports.getAvailbleAirportsInDestination = async (req, res, next) => {
  try {
    const destinations = await AvailableAirportInDestination.find();

    const ids = destinations.map(item => item.airportId);

    const airports = await Airport.find({ _id: { $in: ids } });

    res.status(200).json({
      status: "success",
      airports,
    });
  } catch (err) {
    next(err);
  }
};

// Destination Vehicles

exports.getAllDestination = base.getAll(Destination);
exports.updateDestination = base.updateOne(Destination);
exports.deleteDestination = base.deleteOne(Destination);
exports.getDestinationByAirport = async (req, res, next) => {
  try {
    const destinationList = await Destination.find({ airportId: req.params.airport }).populate('vehicles.categoryId');;

    res.status(200).json({
      status: "success",
      destinationList,
    });
  } catch (err) {
    next(err);
  }
};
exports.getvehicleByDestination = async (req, res, next) => {
  try {
    const destination = await Destination.find({
      destinationId: req.params.destination,
    });

    for (const d of destination) {
      if (d.destinationId) {
        await d.populate("vehicleId").execPopulate();
      }
    }
    const finalData = destination.map((item, id) => ({
      vehicleId: item.vehicleId._id.toString(),
      price: item.price,
      categoryName: item.vehicleId.categoryName,
    }));

    const vehicles = await VehicleModel.find({
      category: { $in: finalData.map((item) => item.vehicleId) },
    });

    const data = vehicles.flatMap((vehicle) => {
      const matchingData = finalData.filter(
        (item) => item.vehicleId === vehicle.category.toString()
      );
      return matchingData.map((item) => ({
        ...item,
        ...vehicle.toObject(),
      }));
    });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};
exports.addDestination = async (req, res, next) => {
  try {
    const destinationVehicle = await Destination.create({
      ...req.body,
      addedDate: new Date(),
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

exports.getvehicleListByAirportDestination = async (req, res, next) => {
  try {
    const destination = await Destination.findOne({
      _id: req.query.destinationId,
    }).lean();
    if (!destination || !Array.isArray(destination.vehicles)) {
      return res.status(400).json({ status: "Fail", message: "Destination not found... " })
    }

    for (const h of destination.vehicles) {
      h.categoryId = await Vehicle.findById(ObjectId(h.categoryId));
    }

    const data = destination?.vehicles.map(item => ({
      categoryId: item.categoryId._id,
      categoryName: item.categoryId.categoryName,
      price: item.price,
      seat: item.seat,
      waterBottle: item.waterBottle,
      fuelType: item.fuelType,
      ac: item.ac,
      carrier: item.carrier,
    }))

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};



const processCSV = async (filePath) => {
  const jsonArray = await csv().fromFile(filePath);
  const currentDate = new Date();
  jsonArray.forEach(item => {
    item.addedDate = currentDate;
    item.fileType = 'csv';
  });
  return jsonArray;
}
const processExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const currentDate = new Date();
  worksheet.forEach(item => {
    item.addedDate = currentDate;
    item.fileType = 'excel';
  });
  return worksheet;
};
exports.handleAirportUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let jsonArray;
    if (ext === '.csv') {
      jsonArray = await processCSV(filePath);
    } else if (ext === '.xlsx' || ext === '.xls') {
      jsonArray = processExcel(filePath);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }
    const savedFiles = await Airport.insertMany(jsonArray);
    res.json({ files: savedFiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};