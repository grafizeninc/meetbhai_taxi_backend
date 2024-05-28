const base = require("./base");
const State = require("../models/state");
const City = require("../models/city");

exports.getAllState = base.getAll(State);
exports.getOneState = base.getOne(State);
exports.updateState = base.updateOne(State);
exports.deleteState = base.deleteOne(State);
exports.addState = async (req, res, next) => {
  try {
    const state = await State.create({
      name: req.body.name,
      code: req.body.code,
      addedDate: new Date(),
    });

    res.status(201).json({
      status: "success",
      data: {
        state,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.getAllCity = base.getAll(City);
exports.getOneCity = base.getOne(City);
exports.updateCity = base.updateOne(City);
exports.deleteCity = base.deleteOne(City);
exports.addCity = async (req, res, next) => {
  try {
    const state = await State.findById(req.body.state);
    if (!state) {
      return next(
        new AppError(401, "fail", "No State found with that id"),
        req,
        res,
        next
      );
    }
    const city = await City.create({
      name: req.body.name,
      code: req.body.code,
      addedDate: new Date(),
      state_id: req.body.state,
      state_name: state.name,
    });

    res.status(201).json({
      status: "success",
      data: {
        city,
      },
    });
  } catch (err) {
    next(err);
  }
};
