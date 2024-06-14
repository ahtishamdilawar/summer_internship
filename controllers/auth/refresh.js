const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserModel = require("../../models/UserSchema.js");
const refreshTokenModel = require("../../models/refreshToken.js");
const generateJwt = require("../../utils/generateJwt.js");

router.get("/", async (req, res) => {
  const { refreshtoken } = req.headers;

  if (!refreshtoken) {
    return res.send("No refresh token provided");
  }

  const refreshDecoded = jwt.verify(refreshtoken, process.env.REFRESH);
  console.log(refreshDecoded);
  const savedRefreshToken = await refreshTokenModel.findOne({
    token: refreshtoken,
  });

  if (!savedRefreshToken) {
    res.send("Invalid refresh token");
    return;
  }

  const user = await UserModel.findById(refreshDecoded.user._id);
  if (!user) {
    return res.send("User not found");
  }

  const newToken = await generateJwt(user);
  console.log(newToken);
  console.log(newToken.accessToken, newToken.refreshToken);
  await refreshTokenModel.findOneAndUpdate(
    { user: user._id },
    {
      token: newToken.refreshToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  res.send({
    NewAccessToken: newToken.accessToken,
    NewRefreshToken: newToken.refreshToken,
  });
});

module.exports = router;
