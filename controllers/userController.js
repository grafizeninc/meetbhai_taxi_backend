const User = require('../models/userModel');
const base = require('./baseController');

exports.getUser = base.getOne(User);
exports.getAll = base.getAll(User);
exports.update = base.updateOne(User);
exports.delete = base.deleteOne(User);