const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validateUser = require("../middleware/validateUser.js");
const UserModel = require("../mongoose/UserSchema.js");
const generatejwt = require("../utils/generateJwt.js");
const RoleModel = require("../mongoose/RoleSchema.js");

router.post("/", validateUser, async (req, res) => {
  const { username, password, email, role } = req.body;

  const roleObj = await RoleModel.findOne({ roleName: role });

  const hashPass = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    password: hashPass,
    email,
    roleID: roleObj._id,
  });
  await newUser.save();
  res.send("User registered");
});

module.exports = router;
