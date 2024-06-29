const Trip = require('../models/trip');
const base = require('./base');
const multer = require('multer');
const path = require('path');
const csv = require('csvtojson');
const xlsx = require('xlsx');
const csvWriter = require('csv-writer');
const pdfMake = require('pdfmake');
const BASE_URL = process.env.APP_URL;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads/img/trip');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

exports.add = async (req, res) => {
  try {
    const { name, price,description } = req.body;
    const imagePath = req.file ? `uploads/img/trip/${req.file.filename}` : '';

    const trip = await Trip.create({
      name: name,
      price: price,
      description: description,
      image: `${BASE_URL}/${imagePath}`
    });

    res.status(201).json({
      status: "success",
      data: trip
    });
  } catch (err) {
    console.log('err----', err)
    next(err);
  }
};
// exports.getAll = base.getAll(Trip);
exports.getAll = async (req, res, next) => {
  try {
    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;

      let searchParams = {};
      if (req.query.search) {
        searchParams = { name: { $regex: req.query.search, $options: 'i' }}
      }

      const totalCount = await Trip.countDocuments(searchParams);
      const data = await Trip.find(searchParams).skip(skip).limit(limit);

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

    const data = await Trip.find(searchParams);
    res.status(200).json({
      status: 'success',
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.getOne = base.getOne(Trip);
exports.update = base.updateOne(Trip);
exports.delete = base.deleteOne(Trip);


const processCSV = async (filePath) => {
  const jsonArray = await csv().fromFile(filePath);
  jsonArray.forEach(item => {
    item.fileType = 'csv';
  });
  return jsonArray;
}
const processExcel = (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const worksheet = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  worksheet.forEach(item => {
    item.fileType = 'excel';
  });
  return worksheet;
};

exports.handleTripUpload = async (req, res) => {
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
    const savedFiles = await Trip.insertMany(jsonArray);
    res.json({ files: savedFiles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.downloadTripFile = async (req, res) => {
  const fileType = req.body.fileType;

  if (!fileType) {
    return res.status(400).send({ message: 'File type is required' });
  }

  let trips = [];
  if (req.body.page && req.body.limit) {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    trips = await Trip.find({}).skip(skip).limit(limit);
  } else {
    trips = await Trip.find().lean();
  }

  try {
    switch (fileType) {
      case 'excel':
        const workbook = xlsx.utils.book_new();
        const tripsData = [['Name', 'Price', 'Description']];

        trips.forEach((trip) => {
          tripsData.push([trip.name, trip.price, trip.download]);
        });

        const worksheet = xlsx.utils.aoa_to_sheet(tripsData);
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Trips');

        const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
        res.setHeader('Content-Disposition', `attachment; filename="trips.xlsx"`);
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.send(buffer);
        break;
      case 'csv':
        // create a CSV file
        const csvData = trips.map(trip => ({
          name: trip.name,
          price: trip.price,
          description: trip.description
        }));
        const filePath = path.join(__dirname, './trip.csv')
        const csvWriterInstance = csvWriter.createObjectCsvWriter({
          path: filePath,
          header: [
            { id: 'name', title: 'Name' },
            {id: 'price', title : 'Price'},
            {id: 'description', title : 'Description'},
          ],
        });
        csvWriterInstance.writeRecords(csvData).then(() => {
          res.setHeader('Content-Disposition', `attachment; filename="trips.csv"`);
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
            { text: 'Trips Report', style: 'header' },
            {
              table: {
                headerRows: 1,
                widths: ['*', '*', '*'],
                body: [
                  ['Name', 'Price', 'Description'],
                  ...trips.map(trip => [trip.name, trip.price, trip.description])
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
    
        res.setHeader('Content-Disposition', 'attachment; filename="trips.pdf"');
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