const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../mongoose/UserSchema.js");

router.get("/me", async (req, res) => {
  const { token } = req.headers;

  if (!token) {
    res.send("No token provided");
    return;
  }
  const user = jwt.verify(token, process.env.JWT);
  res.send(user);
});
module.exports = router;
