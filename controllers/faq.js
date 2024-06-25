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
        const faqs = await FAQ.find().sort('order').exec();
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
