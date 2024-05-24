const base = require("./baseController");
const Vehicle = require("../models/vehicleModel");
const VehicleModel = require("../models/vehicleModel-Model");

exports.getModelAll = base.getAll(VehicleModel);
exports.getModelOne = base.getOne(VehicleModel);
exports.updateModel = base.updateOne(VehicleModel);
exports.deleteModel = base.deleteOne(VehicleModel);
exports.addModel = async (req, res, next) => {
  try {
    const vehicleModel = await VehicleModel.create({
      category: req.body.category,
      modelName: req.body.modelName,
      seatSegment: req.body.seatSegment,
      fuelType: req.body.fuelType,
      luggage: req.body.luggage,
      ac: req.body.ac,
      waterBottle: req.body.waterBottle,
      carrier: req.body.carrier,
    });

    res.status(201).json({
      status: "success",
      data: {
        vehicleModel,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Vehicle

exports.getAll = base.getAll(Vehicle);
exports.getOne = base.getOne(Vehicle);
exports.update = base.updateOne(Vehicle);
exports.delete = base.deleteOne(Vehicle);
exports.add = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create({
      categoryName: req.body.categoryName,
      priority: req.body.code,
    });

    res.status(201).json({
      status: "success",
      data: {
        vehicle,
      },
    });
  } catch (err) {
    next(err);
  }
};
