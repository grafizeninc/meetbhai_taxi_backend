const rolePermission = require("../models/rolePermission");
const base = require("./base");

// exports.getAll = base.getAll(rolePermission);
exports.getAll = async (req, res, next) => {
  try {
    let searchParams;
    if (req.query.search) {
      searchParams = { name: { $regex: req.query.search, $options: 'i' }}
    }

    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      const totalCount = await rolePermission.countDocuments(searchParams);
      const data = await rolePermission.find(searchParams).skip(skip).limit(limit);

      return res.status(200).json({
        status: 'success',
        data,
        page,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      });
    }

    const data = await rolePermission.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = base.getOne(rolePermission);
exports.update = base.updateOne(rolePermission);
exports.delete = base.deleteOne(rolePermission);

exports.add = async (req, res, next) => {
  try {
    const roles = await rolePermission.create({
      ...req.body,
    });

    res.status(201).json({
      status: "success",
      data: roles
    });
  } catch (err) {
    next(err);
  }
};