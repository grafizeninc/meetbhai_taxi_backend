const base = require('./baseController');
const OutStation = require("../models/outStationModel");
const State = require("../models/stateModel");
const AppError = require("../utils/appError");

exports.getAll = base.getAll(OutStation);
exports.getOne = base.getOne(OutStation);
exports.update = base.updateOne(OutStation);
exports.delete = base.deleteOne(OutStation);
exports.add = async (req, res, next) => {
    try {
        const state = await State.findById(req.body.stateId);
        if (!state) {
            return next(
                new AppError(401, "fail", "No State found with that id"),
                req,
                res,
                next
            );
        }

        let result;
        const alreadyExist = await OutStation.findOne({ stateId: req.body.stateId });

        if (alreadyExist) {
            result = await OutStation.findByIdAndUpdate(alreadyExist._id, req.body, { new: true, upsert: true, lean: true });
        } else {
            result = await OutStation.create(req.body);
        }
        
        res.status(201).json({
            status: "success",
            data: {
                result,
            },
        });
    } catch (err) {
        next(err);
    }
}