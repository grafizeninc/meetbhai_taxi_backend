const base = require("./base");
const Vehicle = require("../models/vehicle");
const VehicleModel = require("../models/vehicleModel");

// exports.getModelAll = base.getAll(VehicleModel);
exports.getModelAll = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams = {};
      if (req.query.search) {
        searchParams = { name: { $regex: req.query.search, $options: 'i' }}
      }

      const totalCount = await VehicleModel.countDocuments(searchParams);
      const data = await VehicleModel.find(searchParams).skip(skip).limit(limit);

      return res.status(200).json({
        status: 'success',
        data,
        page,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      });
    }

    let searchParams = {};
    if (req.query.search) {
      searchParams = { name: { $regex: req.query.search, $options: 'i' }}
    }
    const data = await VehicleModel.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.getModelOne = base.getOne(VehicleModel);
exports.updateModel = base.updateOne(VehicleModel);
exports.deleteModel = base.deleteOne(VehicleModel);
exports.addModel = async (req, res, next) => {
  try {
    const vehicleModel = await VehicleModel.create({
      category: req.body.category,
      name: req.body.name,
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

// exports.getAll = base.getAll(Vehicle);
exports.getAll = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams = {};
      if (req.query.search) {
        searchParams = {categoryName: {$regex: req.query.search, $options: 'i'}}
      }

      const totalCount = await Vehicle.countDocuments(searchParams);
      const data = await Vehicle.find(searchParams).skip(skip).limit(limit);

      return res.status(200).json({
        status: 'success',
        data,
        page,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      });
    }

    let searchParams = {};
    if (req.query.search) {
      searchParams = {categoryName: {$regex: req.query.search, $options: 'i'}}
    }

    const data = await Vehicle.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

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
