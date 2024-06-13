const express = require("express");
const router = express.Router();
const path = require("path");
const RoleModel = require("../../models/RoleSchema.js");
const UserModel = require("../../models/UserSchema.js");

router.get("/", async (req, res) => {
  //get all roles objects
  console.log(req.body.roleID);
  const roles = await RoleModel.find();
  if (!roles) return res.status(400).send("No roles found");
  if (req.body.roleID == roles[0]._id) {
    return res.send("Teacher");
  }
  if (req.body.roleID == roles[1]._id.toString()) {
    return res.send("Student");
  }
  res.send("empty body");
});

router.get("/:id", async (req, res) => {
  //get role by id
  const role = await RoleModel.findOne({ _id: req.params.id });
  if (!role) return res.status(400).send("Role not found");
  res.send(role);
});

module.exports = router;
