const User = require("../models/user");
const Admin = require("../models/admin");
const base = require("./base");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const csv = require('csvtojson');
const xlsx = require('xlsx');
const csvWriter = require('csv-writer');
const pdfMake = require('pdfmake');
const BASE_URL = process.env.APP_URL;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/uploads/img/profile');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});


const createToken = (id) => {
    return jwt.sign(
        {
            id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN,
        }
    );
};


exports.getUser = base.getOne(User);
// exports.getAll = base.getAll(User);
exports.delete = base.deleteOne(User);

exports.getAll = async (req, res, next) => {
    try {
        let searchParams = {};
        if (req.query.search) {
            searchParams = { name: { $regex: req.query.search, $options: 'i' } }
        }

        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            const totalCount = await User.countDocuments(searchParams);
            const data = await User.find(searchParams).skip(skip).limit(limit);

            return res.status(200).json({
                status: 'success',
                data,
                page,
                totalCount: totalCount,
                totalPages: Math.ceil(totalCount / limit)
            });
        }

        const data = await User.find(searchParams);
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (err) {
        next(err);
    }
};

exports.updateUser = async (req, res, next) => {
    try {
        const { name, password, passwordConfirm, walletAmount, state, city, address, billingName, GSTNumber } = req.body;
        const image = req.file ? `uploads/img/profile/${req.file.filename}` : null;
        const edituser = await User.findByIdAndUpdate(req.params.id, {
            state, city, address, billingName, GSTNumber, name, password, passwordConfirm, walletAmount,
            profileImage: `${BASE_URL}/${image}`,
        }, { new: true },
        );
        res.status(200).json({
            edituser,
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAdminUser = base.getOne(Admin);
// exports.getAllAdminUser = base.getAll(Admin);

exports.getAllAdminUser = async (req, res, next) => {
    try {
        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            let searchParams;
            if (req.query.search) {
                searchParams = { name: { $regex: req.query.search, $options: 'i' } }
            }

            const totalCount = await Admin.countDocuments(searchParams);
            const data = await Admin.find(searchParams).skip(skip).limit(limit);

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
            searchParams = { name: { $regex: req.query.search, $options: 'i' } }
        }

        const data = await Admin.find(searchParams);
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (err) {
        next(err);
    }
};

exports.updateAdminUser = base.updateOne(Admin);
exports.deleteAdminUser = base.deleteOne(Admin);

exports.adminUser = async (req, res, next) => {
    try {
        const admin = await Admin.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
            phoneNumber: req.body.phoneNumber,
            roleId: req.body.roleId
        });

        const token = createToken(admin.id);

        admin.password = undefined;

        res.status(201).json({
            status: "success",
            token,
            data: admin
        });
    } catch (err) {
        next(err);
    }
};

exports.downloadUserFile = async (req, res) => {
    const fileType = req.body.fileType;
  
    if (!fileType) {
      return res.status(400).send({ message: 'File type is required' });
    }
  
    let users = [];
    if (req.body.page && req.body.limit) {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
      users = await User.find({}).skip(skip).limit(limit);
    } else {
      users = await User.find().lean();
    }
  
    try {
      switch (fileType) {
        case 'excel':
          const workbook = xlsx.utils.book_new();
          const usersData = [['Name', 'Email', 'PhoneNumber']];
  
          users.forEach((user) => {
            usersData.push([user.name, user.email, user.phoneNumber]);
          });
  
          const worksheet = xlsx.utils.aoa_to_sheet(usersData);
          xlsx.utils.book_append_sheet(workbook, worksheet, 'users');
  
          const buffer = xlsx.write(workbook, { bookType: 'xlsx', type: 'buffer' });
          res.setHeader('Content-Disposition', `attachment; filename="users.xlsx"`);
          res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
          res.send(buffer);
          break;
        case 'csv':
          // create a CSV file
          const csvData = users.map(user => ({
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber

          }));
          const filePath = path.join(__dirname, './user.csv')
          const csvWriterInstance = csvWriter.createObjectCsvWriter({
            path: filePath,
            header: [
              { id: 'name', title: 'Name' },
              {id: 'email', title : 'Email'},
              {id: 'phoneNumber', title : 'PhoneNumber'},

            ],
          });
          csvWriterInstance.writeRecords(csvData).then(() => {
            res.setHeader('Content-Disposition', `attachment; filename="users.csv"`);
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
              { text: 'Users Report', style: 'header' },
              {
                table: {
                  headerRows: 1,
                  widths: ['*', '*', '*'],
                  body: [
                    ['Name', 'Email',  'PhoneNumber'],
                    ...users.map(user => [user.name, user.email, user.phoneNumber])
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
      
          res.setHeader('Content-Disposition', 'attachment; filename="users.pdf"');
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