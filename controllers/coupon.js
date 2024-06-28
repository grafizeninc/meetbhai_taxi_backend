const base = require("./base");
const Coupon = require("../models/coupon");
const generateRandomCode = require("../utils/generateCode");

// exports.getAll = base.getAll(Coupon);

exports.getAll = async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.active) {
      filter.active = req.query.active
    }
    if (req.query.categoryId) {
      filter.categoryId = req.query.categoryId
    }

    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams = {...filter};
      if (req.query.search) {
        searchParams = {name: { $regex: req.query.search, $options: 'i' }}
      }

      const totalCount = await Coupon.countDocuments(searchParams);
      const data = await Coupon.find(searchParams).skip(skip).limit(limit);

      return res.status(200).json({
        status: 'success',
        data,
        page,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      });
    }

    let searchParams = {...filter};
    if (req.query.search) {
      searchParams = {name: { $regex: req.query.search, $options: 'i' }}
    }

    const data = await Coupon.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = base.getOne(Coupon);
exports.update = base.updateOne(Coupon);
exports.delete = base.deleteOne(Coupon);
exports.add = async (req, res, next) => {
  try {
    const coupon = await Coupon.create({
      name: req.body.name,
      couponCode: generateRandomCode(7),
      amount: req.body.amount,
      discountType: req.body.discountType,
      startDate: req.body.startDate,
      endDate: req.body.endDate ? req.body.endDate : "",
      ...(req.body.categoryId ? {categoryId: req.body.categoryId} : {})
    });

    res.status(201).json({
      status: "success",
      data: coupon
    });
  } catch (err) {
    next(err);
  }
};
