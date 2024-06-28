const base = require("./base");
const policyModel = require("../models/policy");

// exports.getAll = base.getAll(policyModel);
exports.getAll = async (req, res, next) => {
  try {
    let searchParams = {};
    if (req.query.search) {
      searchParams = { content: { $regex: req.query.search, $options: 'i' }}
    }

    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const totalCount = await policyModel.countDocuments(searchParams);
      const data = await policyModel.find(searchParams).skip(skip).limit(limit);

      return res.status(200).json({
        status: 'success',
        data,
        page,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      });
    }

    const data = await policyModel.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

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
