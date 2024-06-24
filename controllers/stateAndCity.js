const base = require("./base");
const State = require("../models/state");
const City = require("../models/city");
const AppError = require("../utils/appError");
const path = require('path');
const csv = require('csvtojson');
const xlsx = require('xlsx');

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
const processCSV = async (filePath) => {
  const jsonArray = await csv().fromFile(filePath);
  const currentDate = new Date();
  jsonArray.forEach(item => {
    item.addedDate = currentDate;
    item.fileType = 'csv';
  });
  return jsonArray;
}
const processExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const currentDate = new Date();
  worksheet.forEach(item => {
    item.addedDate = currentDate;
    item.fileType = 'excel';
  });
  return worksheet;
};
exports.handleStateUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let jsonArray;
    if (ext === '.csv') {
      jsonArray = await processCSV(filePath);
    } else if (ext === '.xlsx' || ext === '.xls') {
      jsonArray = processExcel(filePath);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }
    const savedFiles = await State.insertMany(jsonArray);
    res.json({ files: savedFiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.handleCityUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let jsonArray;
    if (ext === '.csv') {
      jsonArray = await processCSV(filePath);
    } else if (ext === '.xlsx' || ext === '.xls') {
      jsonArray = processExcel(filePath);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }
    const savedFiles = await City.insertMany(jsonArray);
    res.json({ files: savedFiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};