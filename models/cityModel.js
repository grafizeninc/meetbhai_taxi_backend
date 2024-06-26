const mongoose = require("mongoose");

const citySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please fill City name"],
  },
  code: {
    type: String,
    required: [true, "Please fill City Short Code"],
    unique: true,
  },
  state_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "State",
    required: [true, "Please fill State"],
  },
  state_name: {
    type: String,
    required: [true, "Please fill State name"],
  },
  addDate: {
    type: Date,
    required: [true, "Please fill City Date Log"],
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

const City = mongoose.model("City", citySchema);
module.exports = City;
