const base = require("./base");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const localPackageModel = require("../models/localHourlyPackages");
const Vehicle = require("../models/vehicle");

// exports.getAll = base.getAll(localPackageModel);
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

      const totalCount = await localPackageModel.countDocuments(searchParams);
      const data = await localPackageModel.find(searchParams).skip(skip).limit(limit);

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

    const data = await localPackageModel.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

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
exports.getPackagesByCity = async (req, res, next) => {
  try {
    const localPackageList = await localPackageModel.find({ cityId: req.params.city }).populate('vehicles.categoryId'); ;

    res.status(200).json({
      status: "success",
      localPackageList,
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

    if (!packageData || !Array.isArray(packageData.vehicles)) {
      return res.status(400).json({ status: "Fail", message: "Local Package not found... " })
    }
    for (const h of packageData?.vehicles) {
      h.categoryId = await Vehicle.findById(ObjectId(h.categoryId));
    }

    const data = packageData?.vehicles.map(item => ({
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