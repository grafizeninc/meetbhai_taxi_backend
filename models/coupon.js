const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill Coupon name"],
  },
  couponCode: {
    type: String
  },
  amount: {
    type: String,
    required: [true, "Please fill Coupon amount"],
  },
  discountType: {
    type: String,
    required: [true, "Please fill discount type"],
    enum: ["flat", "percentage"]
  },
  // description: {
  //   type: String,
  //   required: false,
  // },
  startDate: {
    type: String,
    required: [true, "Please fill Start Date"],
  },
  endDate: {
    type: String,
    required: false,
    default: "",
  },
  expireMessage: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle"
  },
  addedDate: {
    type: Date,
    required: false,
  },
  updatedDate: {
    type: Date,
    required: false,
  },
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);
module.exports = Coupon;
