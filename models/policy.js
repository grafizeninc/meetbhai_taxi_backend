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
}, { timestamp: true });

const Policy = mongoose.model("Policy", policySchema);
module.exports = Policy;
