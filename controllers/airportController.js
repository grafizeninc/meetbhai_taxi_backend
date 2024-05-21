const base = require('./baseController');
const Airport = require("../models/airportModel");

exports.getAll = base.getAll(Airport);
exports.getOne = base.getOne(Airport);
exports.update = base.updateOne(Airport);
exports.delete = base.deleteOne(Airport);
exports.add = async (req, res, next) => {
    try {
        const airport = await Airport.create({
            name: req.body.name,
            code: req.body.code,
            cityName: req.body.cityName,
            dateLogs: req.body.dateLogs,
        });
        
          res.status(201).json({
            status: "success",
            data: {
              airport,
            },
          });
    } catch (err) {
        next(err);
    }
}