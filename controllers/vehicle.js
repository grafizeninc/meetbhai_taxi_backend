const base = require("./base");
const Vehicle = require("../models/vehicle");
const VehicleModel = require("../models/vehicleModel");
const path = require('path');
const csv = require('csvtojson');
const xlsx = require('xlsx');
const csvWriter = require('csv-writer');
const pdfMake = require('pdfmake');

// exports.getModelAll = base.getAll(VehicleModel);
exports.getModelAll = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams = {};
      if (req.query.search) {
        searchParams = { name: { $regex: req.query.search, $options: 'i' }}
      }

      const totalCount = await VehicleModel.countDocuments(searchParams);
      const data = await VehicleModel.find(searchParams).skip(skip).limit(limit);

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
    const data = await VehicleModel.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.getModelOne = base.getOne(VehicleModel);
exports.updateModel = base.updateOne(VehicleModel);
exports.deleteModel = base.deleteOne(VehicleModel);
exports.addModel = async (req, res, next) => {
  try {
    const vehicleModel = await VehicleModel.create({
      category: req.body.category,
      name: req.body.name,
      seatSegment: req.body.seatSegment,
      fuelType: req.body.fuelType,
      luggage: req.body.luggage,
      ac: req.body.ac,
      waterBottle: req.body.waterBottle,
      carrier: req.body.carrier,
    });

    res.status(201).json({
      status: "success",
      data: {
        vehicleModel,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Vehicle

// exports.getAll = base.getAll(Vehicle);
exports.getAll = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams = {};
      if (req.query.search) {
        searchParams = {categoryName: {$regex: req.query.search, $options: 'i'}}
      }

      const totalCount = await Vehicle.countDocuments(searchParams);
      const data = await Vehicle.find(searchParams).skip(skip).limit(limit);

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
      searchParams = {categoryName: {$regex: req.query.search, $options: 'i'}}
    }

    const data = await Vehicle.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = base.getOne(Vehicle);
exports.update = base.updateOne(Vehicle);
exports.delete = base.deleteOne(Vehicle);
exports.add = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.create({
      categoryName: req.body.categoryName,
      priority: req.body.priority,
    });

    res.status(201).json({
      status: "success",
      data: {
        vehicle,
      },
    });
  } catch (err) {
    next(err);
  }
};


exports.downloadVehicleFile = async (req, res) => {
  const fileType = req.body.fileType;

  if (!fileType) {
    return res.status(400).send({ message: 'File type is required' });
  }

  let vehicles = [];
  if (req.body.page && req.body.limit) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    vehicles = await Vehicle.find({}).skip(skip).limit(limit);
  } else {
    vehicles = await Vehicle.find().lean();
  }

  try {
    switch (fileType) {
      case 'excel':
        const workbook = xlsx.utils.book_new();
        const vehiclesData = [['Name', 'Priority']];

        vehicles.forEach((vehicle) => {
          vehiclesData.push([vehicle.categoryName, vehicle.priority]);
        });

        const worksheet = xlsx.utils.aoa_to_sheet(vehiclesData);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'vehicles');

        const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', `attachment; filename="vehicles.xlsx"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
        break;
      case 'csv':
        // create a CSV file
        const csvData = vehicles.map(vehicle => ({
          categoryName: vehicle.categoryName,
          priority: vehicle.priority,
        }));
        const filePath = path.join(__dirname, './vehicles.csv')
        const csvWriterInstance = csvWriter.createObjectCsvWriter({
          path: filePath,
          header: [
            { id: 'categoryName', title: 'Name' },
            { id: 'priority', title: 'Priority'}
          ],
        });
        csvWriterInstance.writeRecords(csvData).then(() => {
          res.setHeader('Content-Disposition', `attachment; filename="vehicles.csv"`);
          res.setHeader('Content-Type', 'text/csv');
          res.sendFile(filePath, (err) => {
            if (err) {
              console.error('Error sending file:', err);
              res.status(500).send('Internal Server Error');
            } else {
              console.log('File sent successfully');
            }
          });
        });
        break;
      case 'pdf':
        // create a PDF file
        const fonts = {
          Roboto: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique',
          },
        };
    
        const printer = new pdfMake(fonts);
    
        const docDefinition = {
          content: [
            { text: 'vehicles Report', style: 'header' },
            {
              table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body: [
                  ['Name', 'Priority'],
                  ...vehicles.map(vehicle => [vehicle.categoryName, vehicle.priority])
                ],
              },
            },
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10],
            },
          },
        };
    
        const pdfDoc = printer.createPdfKitDocument(docDefinition);
        pdfDoc.pipe(res);
        pdfDoc.end();
    
        res.setHeader('Content-Disposition', 'attachment; filename="vehicles.pdf"');
        res.setHeader('Content-Type', 'application/pdf');
        break;
      default:
        res.status(400).send({ message: 'Invalid file type' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error generating file' });
  }
}

const processVehicleCSV = async (filePath) => {
  const jsonArray = await csv().fromFile(filePath);
  const currentDate = new Date();
  jsonArray.forEach(item => {
    item.addedDate = currentDate;
    item.fileType = 'csv';
  });
  return jsonArray;
}
const processVehicleExcel = (filePath) => {
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

exports.handleVehicleUpload = async (req, res) => {
  try {
    const filePath = req.file.path;
    const ext = path.extname(req.file.originalname).toLowerCase();
    let jsonArray;
    if (ext === '.csv') {
      jsonArray = await processVehicleCSV(filePath);
    } else if (ext === '.xlsx' || ext === '.xls') {
      jsonArray = processVehicleExcel(filePath);
    } else {
      return res.status(400).json({ error: 'Unsupported file format' });
    }
    const savedFiles = await Vehicle.insertMany(jsonArray);
    res.json({ files: savedFiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

