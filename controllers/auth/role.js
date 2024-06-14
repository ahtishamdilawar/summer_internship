const express = require("express");
const router = express.Router();
const path = require("path");
const RoleModel = require("../../models/RoleSchema.js");
const UserModel = require("../../models/UserSchema.js");

router.get("/:id", async (req, res) => {
  const role = await RoleModel.findOne({ _id: req.params.id });
  if (!role) return res.status(400).send("Role not found");
  res.send(role);
});

module.exports = router;
