const base = require("./base");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const localPackageModel = require("../models/localHourlyPackages");
const Vehicle = require("../models/vehicle");

exports.getAll = base.getAll(localPackageModel);
exports.getOne = base.getOne(localPackageModel);
exports.update = base.updateOne(localPackageModel);
exports.delete = base.deleteOne(localPackageModel);
exports.add = async (req, res, next) => {
  try {
    const localHourlyPackage = await localPackageModel.create({
      ...req.body,
      addedDate: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: {
        localHourlyPackage,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getVehicleListByLocalAirportPackage = async (req, res, next) => {
  try {
    const packageData = await localPackageModel.findOne({
      _id: req.query.packageId,
      cityId: req.query.cityId,
    }).lean();

    for (const h of packageData?.vehicles) {
      h.categoryId = await Vehicle.findById(ObjectId(h.categoryId));
    }

    const data = packageData?.vehicles.map(item => ({
      categoryId: item.categoryId._id,
      categoryName: item.categoryId.categoryName,
      price: item.price
    }))

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (err) {
    next(err);
  }
};