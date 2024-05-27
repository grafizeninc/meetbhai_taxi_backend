const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill Coupon name"],
  },
  amount: {
    type: String,
    required: [true, "Please fill Coupon amount"],
  },
  description: {
    type: String,
    required: false,
  },
  startDate: {
    type: String,
    required: [true, "Please fill Start Date"],
  },
  endDate: {
    type: String,
    required: false,
    default: "",
  },
  addedDate: {
    type: Date,
    required: false,
  },
  updatedDate: {
    type: Date,
    required: false,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
