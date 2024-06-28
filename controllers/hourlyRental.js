const base = require("./base");
const hourlyRentalModel = require("../models/hourlyRental");
const Vehicle = require("../models/vehicle");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// exports.getAll = base.getAll(hourlyRentalModel);
exports.getAll = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams;
      if (req.query.search) {
        searchParams = { packageName: { $regex: req.query.search, $options: 'i' }}
      }

      const totalCount = await hourlyRentalModel.countDocuments(searchParams);
      const data = await hourlyRentalModel.find(searchParams).skip(skip).limit(limit);

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
      searchParams = { packageName: { $regex: req.query.search, $options: 'i' }}
    }

    const data = await hourlyRentalModel.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

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
exports.getHourlyPackagesByCity = async (req, res, next) => {
  try {
    const hourlyRentalList = await hourlyRentalModel.find({ cityId: req.params.city }).populate('vehicles.categoryId'); ;

    res.status(200).json({
      status: "success",
      hourlyRentalList,
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
