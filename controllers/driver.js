const base = require("./base");
const driverModel = require("../models/driver");

exports.getAll = base.getAll(driverModel);
exports.getOne = base.getOne(driverModel);
exports.update = base.updateOne(driverModel);
exports.delete = base.deleteOne(driverModel);

exports.add = async (req, res, next) => {
  try {
    const rcBook = req.files['rcBook'] ? req.files['rcBook'][0].path : null;
    const licence = req.files['licence'] ? req.files['licence'][0].path : null;
    const insurance = req.files['insurance'] ? req.files['insurance'][0].path : null;

    const driverExist = await driverModel.findOne({name: req.body.name, mobileNumber: req.body.mobileNumber}).exec();
    if (driverExist) {
      return res.status(401).json({status: 'fail', message: 'Driver already exist'});
    }

    const driver = await driverModel.create({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      rcBook: rcBook,
      licence: licence,
      insurance: insurance
    });

    res.status(201).json({
      status: "success",
      data: driver
    });
  } catch (err) {
    next(err);
  }
};
