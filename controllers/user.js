const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../mongoose/UserSchema.js");
const authenticateUser = require("../middleware/authenticateUser.js");

router.get("/me", authenticateUser, async (req, res) => {
  console.log(req.headers);
  const { token } = req.headers;

  if (!token) {
    res.send("No token provided");
    return;
  }
  const user = jwt.verify(token, process.env.JWT);
  res.send(user);
});
module.exports = router;
