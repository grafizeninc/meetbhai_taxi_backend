const base = require('./baseController');
const localHourlyPackagesModel = require("../models/localHourlyPackagesModel");

exports.getAll = base.getAll(localHourlyPackagesModel);
exports.getOne = base.getOne(localHourlyPackagesModel);
exports.update = base.updateOne(localHourlyPackagesModel);
exports.delete = base.deleteOne(localHourlyPackagesModel);
exports.add = async (req, res, next) => {
    try {
        const localHourlyPackage = await localHourlyPackagesModel.create({
            location: req.body.location,
            time: req.body.time,
            kms: req.body.kms,
            hatchBack: req.body.hatchBack,
            suv: req.body.suv,
            sedan: req.body.sedan,
            innovaCrysta: req.body.innovaCrysta,
            tempoTr: req.body.tempoTr,
            addedDate: new Date(),
        });
        
          res.status(201).json({
            status: "success",
            data: {
                localHourlyPackage,
            },
          });
    } catch (err) {
        next(err);
    }
}