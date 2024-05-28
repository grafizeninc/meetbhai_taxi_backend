const mongoose = require("mongoose");

const stateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill State name"],
  },
  code: {
    type: String,
    required: [true, "Please fill State Short Code"],
    unique: true,
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
  },
});

const State = mongoose.model("State", stateSchema);
module.exports = State;
