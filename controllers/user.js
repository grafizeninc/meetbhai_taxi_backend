const User = require("../models/user");
const base = require("./base");

exports.getUser = base.getOne(User);
