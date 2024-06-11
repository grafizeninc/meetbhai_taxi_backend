const base = require("./base");
const hourlyRentalModel = require("../models/hourlyRental");

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
