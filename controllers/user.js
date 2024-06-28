const User = require("../models/user");
const Admin = require("../models/admin");
const base = require("./base");
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
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