const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({
  roleID: {
    type: String,
    required: true,
    unique: true,
  },
  roleName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Role", roleSchema);
