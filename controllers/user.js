const User = require("../models/user");
const Admin = require("../models/admin");
const base = require("./base");
const jwt = require("jsonwebtoken");

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
exports.update = base.updateOne(User);
exports.delete = base.deleteOne(User);

exports.getAll = async (req, res, next) => {
    try {
        if (req.query.page && req.query.limit) {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;

            let searchParams;
            if (req.query.search) {
                searchParams = {name: { $regex: req.query.search, $options: 'i' }}
            }

            const totalCount = await User.countDocuments(searchParams);
            const data = await User.find(searchParams).skip(skip).limit(limit);

            return res.status(200).json({
                status: 'success',
                data,
                page,
                totalPages: Math.ceil(totalCount / limit)
            });
        }

        const data = await User.find({});
        res.status(200).json({
            status: 'success',
            data
        });
    } catch (err) {
        next(err);
    }
};

// Admin user for role wise


exports.getAdminUser = base.getOne(Admin);
exports.getAllAdminUser = base.getAll(Admin);
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