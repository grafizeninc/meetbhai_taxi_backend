const base = require('./base');
const OutStation = require("../models/outStation");
const State = require("../models/state");
const AppError = require("../utils/appError");
const Vehicle = require("../models/vehicle");

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

exports.getVehicleListByOutStationCity = async (req, res, next) => {
    try {
        // const vehicle = await Vehicle.find({});
        //
        // for (const v of vehicle) {
        //     v.categoryId = await Vehicle.findById(ObjectId(h.categoryId));
        // }

        // const data = vehicle?.vehicles.map(item => ({
        //     categoryId: item.categoryId._id,
        //     categoryName: item.categoryId.categoryName,
        //     price: item.price
        // }))
        const data = await Vehicle.find({});

        res.status(200).json({
            status: "success",
            data,
        });
    } catch (err) {
        next(err);
    }
};