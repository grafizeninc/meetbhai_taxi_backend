const Otp = require("../models/otp");
const User = require("../models/user");
const generateOtp = require("../utils/generateOtp");
const {sendWhatsappOTP} = require("../utils/wp-message");

exports.sendOtp = async (req, res) => {
  const { phone } = req.body;
  try {
    const otp = generateOtp();
    const userId = req.body.userId;
    // const countryCode = '+91'
    // const formattedPhoneNumber = PhoneNumber.format(phone, countryCode, 'International_plaintext');

    // Replace otp if exist
    const otpUserExist = await Otp.findOne({ userId });
    let otpData;
    if (otpUserExist) {
      otpData = await Otp.findOneAndUpdate({_id: otpUserExist._id}, { otp }, {upsert: true, new: true});
    } else {
      otpData = await Otp.create({ phone, otp, userId });
    }

    const userData = await User.findOne({ _id: userId }, { name: 1 })

    sendWhatsappOTP({
      name: userData?.name,
      to: phone,
      otp,
    })
    return res
        .status(200)
        .json({
          status: 200, message: "Otp sent successfully", data: { otpData, userData }
        });
  } catch (error) {
    console.log(error.message);
    return res
        .status(500)
        .json({ status: 500, message: "Internal error", data: null });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const existingOtpData = await Otp.findOne({ phone, otp });
    
    if (!existingOtpData) {
      return res.status(404).json({ status: 404, message: "OTP not found for the given phone number" });
    }
    if (existingOtpData) {
      await existingOtpData.remove()
      return res.status(200).json({ status: 200, message: "OTP verification successful" });

    } else {
      return res.status(400).json({ status: 400, message: "Incorrect OTP" });
    }

  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: 500, message: "Internal error", data: null });
  }
};
