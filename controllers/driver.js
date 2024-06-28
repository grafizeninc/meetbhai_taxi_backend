const base = require("./base");
const driverModel = require("../models/driver");
const path = require("path")
const fs = require("fs")

// exports.getAll = base.getAll(driverModel);
exports.getAll = async (req, res, next) => {
    try {
        let searchParams = {};
        if (req.query.search) {
            searchParams = { name: { $regex: req.query.search, $options: 'i' }}
        }

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const totalCount = await driverModel.countDocuments(searchParams);
            const data = await driverModel.find(searchParams).skip(skip).limit(limit);

            return res.status(200).json({
                status: 'success',
                data,
                page,
                totalCount: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            });
        }

        const data = await driverModel.find(searchParams);
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (err) {
        next(err);
    }
};

exports.getOne = base.getOne(driverModel);
exports.update = base.updateOne(driverModel);
exports.delete = base.deleteOne(driverModel);

exports.add = async (req, res, next) => {
  try {
    const rcBook = req.files['rcBook'] ? req.files['rcBook'][0].path : null;
    const licence = req.files['licence'] ? req.files['licence'][0].path : null;
    const insurance = req.files['insurance'] ? req.files['insurance'][0].path : null;

    const driverExist = await driverModel.findOne({name: req.body.name, mobileNumber: req.body.mobileNumber}).exec();
    if (driverExist) {
      return res.status(401).json({status: 'fail', message: 'Driver already exist'});
    }

    const driver = await driverModel.create({
      name: req.body.name,
      mobileNumber: req.body.mobileNumber,
      rcBook: rcBook,
      licence: licence,
      insurance: insurance
    });

    res.status(201).json({
      status: "success",
      data: driver
    });
  } catch (err) {
    next(err);
  }
};


const mainFolder = path.join(__dirname, '../uploads/img/driverDetails');
if (!fs.existsSync(mainFolder)) {
    fs.mkdirSync(mainFolder, { recursive: true });
}
const subFolders = ['rcBook', 'licence', 'insurance'];
subFolders.forEach(subFolder => {
    const subFolderPath = path.join(mainFolder, subFolder);
    if (!fs.existsSync(subFolderPath)) {
        fs.mkdirSync(subFolderPath, { recursive: true });
    }
});
// Controller to flush (delete) all images in the main folder and its subfolders
exports.flushImages = async (req, res) => {
    try {
        for (const subFolder of subFolders) {
            const subFolderPath = path.join(mainFolder, subFolder);
            const files = await fs.promises.readdir(subFolderPath);
            // Deleting files asynchronously
            await Promise.all(files.map(async (file) => {
                const filePath = path.join(subFolderPath, file);
                await fs.promises.unlink(filePath);
            }));
        }
        res.status(200).json({ message: 'All images flushed successfully' });
    } catch (err) {
        console.error(`Error flushing images: ${err.message}`);
        res.status(500).json({ message: 'Error flushing images' });
    }
};