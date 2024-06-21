const mongoose = require("mongoose");

const RolePermissionSchema = new mongoose.Schema({
  name: {
    type: String
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
}, { timestamps: true });

const RolePermission = mongoose.model(
  "RolePermission",
  RolePermissionSchema
);
module.exports = RolePermission;
