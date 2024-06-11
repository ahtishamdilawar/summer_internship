const express = require("express");
const router = express.Router();
const path = require("path");
const UserModel = require("../mongoose/UserSchema.js");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
  const { username, password, email } = req.body;
  const existingUser = await UserModel.findOne({ username });
  if (existingUser) {
    res.send("User already exists");
    return;
  }

  const hashPass = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    username,
    password: hashPass,
    email,
  });
  await newUser.save();
  res.send("User created");
});

module.exports = router;
