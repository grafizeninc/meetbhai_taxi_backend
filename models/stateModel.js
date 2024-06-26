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
  addDate: {
    type: Date,
    required: [true, "Please fill Date"],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const State = mongoose.model("State", stateSchema);
module.exports = State;
