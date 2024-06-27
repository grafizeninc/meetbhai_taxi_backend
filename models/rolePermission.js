const mongoose = require("mongoose");

const RolePermissionSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  description: {
    type: String
  },
  permissions: {
    type: Array,
    default: [],
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

const RolePermission = mongoose.model(
  "RolePermission",
  RolePermissionSchema
);
module.exports = RolePermission;
