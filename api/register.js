const express = require("express");
const router = express.Router();
const path = require("path");
const UserModel = require("../mongoose/UserSchema.js");
const RoleModel = require("../mongoose/RoleSchema.js");
const bcrypt = require("bcrypt");

async function validateUser(req, res, next) {
  const { username, password, email, role } = req.body;
  if (!username || !password || !email) {
    res.send("Invalid username or password or email or role");
    return;
  }
  if (role !== "Student" && role !== "Teacher") {
    res.send("Invalid role");
    return;
  }
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    res.send("User already exists");
    return;
  }
  next();
}

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
  res.send("User created");
});

module.exports = router;
