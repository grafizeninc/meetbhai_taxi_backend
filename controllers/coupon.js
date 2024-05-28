const base = require("./base");
const Coupon = require("../models/coupon");

exports.getAll = base.getAll(Coupon);
exports.getOne = base.getOne(Coupon);
exports.update = base.updateOne(Coupon);
exports.delete = base.deleteOne(Coupon);
exports.add = async (req, res, next) => {
  try {
    const coupon = await Coupon.create({
      name: req.body.name,
      amount: req.body.amount,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate ? req.body.endDate : "",
      addedDate: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: {
        coupon,
      },
    });
  } catch (err) {
    next(err);
  }
};
