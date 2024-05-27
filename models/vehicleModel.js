const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: [true, "Please fill Vehicle Category Name"],
  },
  priority: {
    type: String,
    required: [true, "Please fill Vehicle Priority"],
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

const Vehicle = mongoose.model("Vehicle", vehicleSchema);
module.exports = Vehicle;
