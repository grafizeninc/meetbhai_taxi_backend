const rolePermission = require("../models/rolePermission");
const base = require("./base");

exports.getAll = base.getAll(rolePermission);
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