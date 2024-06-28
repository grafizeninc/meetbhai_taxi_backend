const Trip = require('../models/trip');
const base = require('./base');
const multer = require('multer');
const path = require('path');
const BASE_URL = process.env.APP_URL;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads/img/trip');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

exports.add = async (req, res) => {
  try {
    const { name, price,description } = req.body;
    const imagePath = req.file ? `uploads/img/trip/${req.file.filename}` : '';

    const trip = await Trip.create({
      name: name,
      price: price,
      description: description,
      image: `${BASE_URL}/${imagePath}`
    });

    res.status(201).json({
      status: "success",
      data: trip
    });
  } catch (err) {
    console.log('err----', err)
    next(err);
  }
};
// exports.getAll = base.getAll(Trip);
exports.getAll = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams = {};
      if (req.query.search) {
        searchParams = { name: { $regex: req.query.search, $options: 'i' }}
      }

      const totalCount = await Trip.countDocuments(searchParams);
      const data = await Trip.find(searchParams).skip(skip).limit(limit);

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
      searchParams = { name: { $regex: req.query.search, $options: 'i' }}
    }

    const data = await Trip.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = base.getOne(Trip);
exports.update = base.updateOne(Trip);
exports.delete = base.deleteOne(Trip);