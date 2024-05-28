const base = require("./base");
const Trip = require("../models/trip");

exports.getAll = base.getAll(Trip);
exports.getOne = base.getOne(Trip);
exports.update = base.updateOne(Trip);
exports.delete = base.deleteOne(Trip);
exports.add = async (req, res, next) => {
  try {
    const trip = await Trip.create({
      type: req.body.type,
      pickUpPoint: req.body.pickUpPoint,
      dropPoint: req.body.dropPoint,
      vehicleType: req.body.vehicleType,
      baseFare: req.body.baseFare,
      baseCoveredKM: req.body.baseCoveredKM || "",
      coveredHours: req.body.coveredHours || "",
      nightCharge: req.body.nightCharge || "",
      driverCharge: req.body.driverCharge || "",
      extraHours: req.body.extraHours || "",
    });

    res.status(201).json({
      status: "success",
      data: {
        trip,
      },
    });
  } catch (err) {
    next(err);
  }
};
