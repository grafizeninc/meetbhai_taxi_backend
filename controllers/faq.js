const FAQ = require('../models/faq');
const base = require("./base");
// exports.getOne = base.getOne(FAQ);
exports.update = base.updateOne(FAQ);
exports.delete = base.deleteOne(FAQ);
exports.add = async (req, res, next) => {
    try {
        const { question, answer, order } = req.body;
        const faq = await FAQ.create({
            question, answer,
            order: parseInt(order),
        });
        res.status(201).json({
            status: "success",
            data: {
                faq,
            }
        });
    }
    catch (err) {
        next(err);
    }
};
exports.getAll = async (req, res, next) => {
    try {
        let searchParams;
        if (req.query.search) {
            searchParams = { question: { $regex: req.query.search, $options: 'i' }}
        }

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const totalCount = await FAQ.countDocuments(searchParams);
            const data = await FAQ.find(searchParams).skip(skip).limit(limit).sort('order');

            return res.status(200).json({
                status: 'success',
                data,
                page,
                totalCount: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            });
        }

        const faqs = await FAQ.find(searchParams).sort('order').exec();
        res.status(200).json({
            status: 'success',
            data: {
                faqs
            }
        });
    } catch (err) {
        next(err);
    }
};
