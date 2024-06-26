const base = require('./baseController');
const localHourlyPackagesModel = require("../models/localHourlyPackagesModel");

// exports.getAll = base.getAll(localHourlyPackagesModel);
exports.getAll = async (req, res, next) => {
    try {
        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            let searchParams;
            if (req.query.search) {
                searchParams = { name: { $regex: req.query.search, $options: 'i' }, code: { $regex: req.query.search, $options: 'i'}}
            }

            const totalCount = await localHourlyPackagesModel.countDocuments(searchParams);
            const data = await localHourlyPackagesModel.find(searchParams).skip(skip).limit(limit);

            return res.status(200).json({
                status: 'success',
                data,
                page,
                totalCount: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            });
        }

        const data = await localHourlyPackagesModel.find({});
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (err) {
        next(err);
    }
};

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