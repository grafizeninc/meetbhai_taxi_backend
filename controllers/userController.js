const User = require('../models/userModel');
const base = require('./baseController');

exports.getUser = base.getOne(User);