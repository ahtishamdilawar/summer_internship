const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/UserSchema.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const getRole = require("../../middleware/roles.js");
router.get("/me", authenticateUser, getRole, async (req, res) => {
  res.send({
    user: res.locals.user,
    role: res.locals.role,
  });
});
module.exports = router;
