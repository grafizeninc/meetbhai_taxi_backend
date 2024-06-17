const base = require("./base");
const driverModel = require("../models/driver");

exports.getAll = base.getAll(driverModel);
exports.getOne = base.getOne(driverModel);
exports.update = base.updateOne(driverModel);
exports.delete = base.deleteOne(driverModel);

exports.add = async (req, res, next) => {
  try {
    const driverExist = await driverModel.findOne({name: req.body.name, mobileNumber: req.body.mobileNumber}).exec();
    if (driverExist) {
      return res.status(401).json({status: 'fail', message: 'Driver already exist'});
    }

    const driver = await driverModel.create({
      ...req.body
    });

    res.status(201).json({
      status: "success",
      data: driver
    });
  } catch (err) {
    next(err);
  }
};
