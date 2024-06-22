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
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter,
});
exports.add = (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(500).json(err);
    } else if (err) {
      return res.status(500).json(err);
    }
    const { name, price } = req.body;
    const imagePath = req.file ? `uploads/img/trip/${req.file.filename}` : '';
    const trip = new Trip({
      name,
      price,
      image: `${BASE_URL}/${imagePath}`
    });
    trip.save()
      .then(() => res.status(201).json({
        status: "success",
        data: {
          trip,
        }
      }))
      .catch(error => res.status(500).json({ error }));
  });
};
exports.getAll = base.getAll(Trip);
exports.getOne = base.getOne(Trip);
exports.update = base.updateOne(Trip);
exports.delete = base.deleteOne(Trip);