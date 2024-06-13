const User = require("../models/user");
const base = require("./base");

exports.getUser = base.getOne(User);
// exports.getAll = base.getAll(User);
exports.update = base.updateOne(User);
exports.delete = base.deleteOne(User);

exports.getAll = async (req, res, next) => {
    try {
        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            let searchParams;
            if (req.query.search) {
                searchParams = {name: { $regex: req.query.search, $options: 'i' }}
            }

            const totalCount = await User.countDocuments(searchParams);
            const data = await User.find(searchParams).skip(skip).limit(limit);

            return res.status(200).json({
                status: 'success',
                data,
                page,
                totalPages: Math.ceil(totalCount / limit)
            });
        }

        const data = await User.find({});
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (err) {
        next(err);
    }
};