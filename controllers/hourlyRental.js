const base = require("./base");
const hourlyRentalModel = require("../models/hourlyRental");
const Vehicle = require("../models/vehicle");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.getAll = base.getAll(hourlyRentalModel);
exports.getOne = base.getOne(hourlyRentalModel);
exports.update = base.updateOne(hourlyRentalModel);
exports.delete = base.deleteOne(hourlyRentalModel);
exports.add = async (req, res, next) => {
  try {
    const hourlyRental = await hourlyRentalModel.create({
      ...req.body,
      addedDate: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: {
        hourlyRental,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getVehicleListByHourlyRentalPackage = async (req, res, next) => {
  try {
    const hourlyRentalData = await hourlyRentalModel.findOne({
      _id: req.query.packageId,
      cityId: req.query.cityId, 
    }).lean();

    if (!hourlyRentalData || !Array.isArray(hourlyRentalData.vehicles)) {
      return res.status(400).json({ status: "Fail", message: "HourlyRental Package not found... " })
    }

    for (const h of hourlyRentalData?.vehicles) {
      h.categoryId = await Vehicle.findById(ObjectId(h.categoryId));
    }

    const data = hourlyRentalData?.vehicles.map(item => ({
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
