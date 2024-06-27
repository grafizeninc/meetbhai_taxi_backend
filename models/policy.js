const mongoose = require("mongoose");

const policySchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, "Please fill content"],
  },
  type: {
    type: String,
    required: [true, "Please fill type"],
    enum: ['privacy-policy', 'terms-condition']
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
}, { timestamps: true });

const Policy = mongoose.model("Policy", policySchema);
module.exports = Policy;
