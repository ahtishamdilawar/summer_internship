const express = require("express");
const router = express.Router();
const path = require("path");
const jwt = require("jsonwebtoken");
const UserModel = require("../mongoose/UserSchema.js");
const refreshTokenModel = require("../mongoose/refreshToken.js");

router.delete("/", async (req, res) => {
  const { refreshtoken } = req.headers;
  if (!refreshtoken) {
    return res.send("No refresh token provided");
  }

  const refreshDecoded = jwt.verify(refreshtoken, process.env.REFRESH);
  const savedRefreshToken = await refreshTokenModel.findOne({
    token: refreshtoken,
  });

  if (!savedRefreshToken) {
    res.send("Invalid refresh token");
    return;
  }

  await refreshTokenModel.findOneAndDelete({ token: refreshtoken });
  res.send("Refresh token deleted");
});

module.exports = router;
