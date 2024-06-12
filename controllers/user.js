const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserSchema.js");
const authenticateUser = require("../middleware/authenticateUser.js");

router.get("/me", authenticateUser, async (req, res) => {
  res.send(req.user);
});
module.exports = router;
