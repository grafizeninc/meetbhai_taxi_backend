const mongoose = require("mongoose");

const referSchema = new mongoose.Schema({
  referPrice: {
    type: Number,
    default: 0,
    required: [true, "Please fill refer price"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  addedDate: {
    type: Date,
    required: false,
  },
  updatedDate: {
    type: Date,
    required: false,
  },
});

const Refer = mongoose.model("Refer", referSchema);
module.exports = Refer;
