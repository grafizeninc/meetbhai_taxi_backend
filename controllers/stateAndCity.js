const base = require("./base");
const State = require("../models/state");
const City = require("../models/city");
const AppError = require("../utils/appError");
const path = require('path');
const csv = require('csvtojson');
const xlsx = require('xlsx');

// exports.getAllState = base.getAll(State);
exports.getAllState = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams = {};
      if (req.query.search) {
        searchParams = { name: { $regex: req.query.search, $options: 'i' }}
      }

      const totalCount = await State.countDocuments(searchParams);
      const data = await State.find(searchParams).skip(skip).limit(limit);

      return res.status(200).json({
        status: 'success',
        data,
        page,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      });
    }

    let searchParams = {};
    if (req.query.search) {
      searchParams = { name: { $regex: req.query.search, $options: 'i' }}
    }

    const data = await State.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

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

// exports.getAllCity = base.getAll(City);
exports.getAllCity = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams = {};
      if (req.query.search) {
        searchParams = { name: { $regex: req.query.search, $options: 'i' }}
      }

      const totalCount = await City.countDocuments(searchParams);
      const data = await City.find(searchParams).skip(skip).limit(limit);

      return res.status(200).json({
        status: 'success',
        data,
        page,
        totalCount: totalCount,
        totalPages: Math.ceil(totalCount / limit)
      });
    }

    let searchParams = {};
    if (req.query.search) {
      searchParams = { name: { $regex: req.query.search, $options: 'i' }}
    }

    const data = await City.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

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


const processCityCSV = async (filePath, id) => {
  const jsonArray = await csv().fromFile(filePath);
  const currentDate = new Date();
  jsonArray.forEach(item => {
    item.addedDate = currentDate;
    item.state_id = id;
    item.fileType = 'csv'; 
  });
  return jsonArray;
}
const processCityExcel = async (filePath, id) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  const currentDate = new Date();
  worksheet.forEach(item => {
    item.addedDate = currentDate;
    item.state_id = id;
    item.fileType = 'excel';
  });
  return worksheet;
};

exports.handleCityUpload = async (req, res) => {
  try {
    const state_id = req.body.state_id;
    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let jsonArray;
    if (ext === '.csv') {
      jsonArray = await processCityCSV(filePath, state_id);
    } else if (ext === '.xlsx' || ext === '.xls') {
      jsonArray = processCityExcel(filePath, state_id);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }
    const savedFiles = await City.insertMany(jsonArray);
    res.json({ files: savedFiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};