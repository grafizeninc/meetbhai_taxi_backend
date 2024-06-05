const base = require('./baseController');
const OutStation = require("../models/outStationModel");

exports.getAll = base.getAll(OutStation);
exports.getOne = base.getOne(OutStation);
exports.update = base.updateOne(OutStation);
exports.delete = base.deleteOne(OutStation);
exports.add = async (req, res, next) => {
    try {
        const OutStation = await OutStation.create(req.body)
        
          res.status(201).json({
            status: "success",
            data: {
                OutStation,
            },
          });
    } catch (err) {
        next(err);
    }
}