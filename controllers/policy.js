const base = require("./base");
const policyModel = require("../models/policy");

exports.getAll = base.getAll(policyModel);
exports.getOne = base.getOne(policyModel);
exports.update = base.updateOne(policyModel);
exports.delete = base.deleteOne(policyModel);

exports.add = async (req, res, next) => {
  try {
    const exist = await policyModel.findOne({type: req.body.type}).exec();
    if (exist) {
      const updatedData = await policyModel.findByIdAndUpdate({_id: exist._id}, {content: req.body.content}, {upsert: true, new: true}).exec();
      return res.status(201).json({status: 'success', data: updatedData});
    }

    const policyData = await policyModel.create({
      ...req.body
    });

    res.status(201).json({
      status: "success",
      data: policyData
    });
  } catch (err) {
    next(err);
  }
};
