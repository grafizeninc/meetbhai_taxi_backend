const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Refer = require("../models/refer");
const Admin = require("../models/admin");
const AppError = require("../utils/appError");
const generateRandomCode = require("../utils/generateCode");

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

/*
  Admin Authentication
*/
exports.adminLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new AppError(404, "fail", "Please provide email or password"),
        req,
        res,
        next
      );
    }

    const admin = await Admin.findOne({
      email,
    }).select("+password");

    if (!admin || !(await admin.correctPassword(password, admin.password))) {
      return next(
        new AppError(401, "fail", "Email or Password is wrong"),
        req,
        res,
        next
      );
    }

    const token = createToken(admin.id);

    admin.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        admin,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.adminSignup = async (req, res, next) => {
  try {
    const admin = await Admin.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      phoneNumber: req.body.phoneNumber,
    });

    const token = createToken(admin.id);

    admin.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        admin,
      },
    });
  } catch (err) {
    next(err);
  }
};

/*
  User Authentication
*/
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(
        new AppError(404, "fail", "Please provide email or password"),
        req,
        res,
        next
      );
    }

    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(
        new AppError(401, "fail", "Email or Password is wrong"),
        req,
        res,
        next
      );
    }

    const token = createToken(user.id);

    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  try {
    const referCode = req.body.referCode;
    let walletAmount = 0;
    if (referCode) {
        const userExist = await User.findOne({referCode: referCode}).lean();

        if (userExist) {
            const referData = await Refer.find({});
            walletAmount = referData[0].referPrice;
        }
    }

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      phoneNumber: req.body.phoneNumber,
      walletAmount: walletAmount,
      referCode: generateRandomCode(6)
    });

    const token = createToken(user.id);

    user.password = undefined;

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError(
          401,
          "fail",
          "You are not logged in! Please login in to continue"
        ),
        req,
        res,
        next
      );
    }

    const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decode.id);
    const admin = await Admin.findById(decode.id);
    if (!user && !admin) {
      return next(
        new AppError(401, "fail", "This user no longer exist"),
        req,
        res,
        next
      );
    }

    if (user) {
      req.user = user;
    } else {
      req.user = admin;
    }

    next();
  } catch (err) {
    next(err);
  }
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, "fail", "You are not allowed to do this action"),
        req,
        res,
        next
      );
    }
    next();
  };
};
