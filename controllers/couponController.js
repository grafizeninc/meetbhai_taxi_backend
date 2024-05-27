const base = require("./baseController");
const Coupon = require("../models/couponModel");

exports.getAll = base.getAll(Coupon);
exports.getOne = base.getOne(Coupon);
exports.update = base.updateOne(Coupon);
exports.delete = base.deleteOne(Coupon);
exports.addCoupon = async (req, res, next) => {
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
