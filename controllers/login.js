const express = require("express");
const router = express.Router();
const path = require("path");
const bcrypt = require("bcrypt");
const validateUser = require("../middleware/validateUser.js");
const generatejwt = require("../utils/generateJwt.js");
const refreshToken = require("../mongoose/refreshToken.js");

router.post("/", validateUser, async (req, res) => {
  const { username, password } = req.body;

  const validPass = await bcrypt.compare(password, res.locals.user.password);
  if (!validPass) {
    res.send("Invalid password");
  }
  const token = await generatejwt(res.locals.user);
  console.log(token);

  await refreshToken.findOneAndUpdate(
    { user: res.locals.user._id },
    {
      token: token.refreshToken,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    },
    { upsert: true }
  );

  res.send({
    accessToken: token.acessToken,
    refreshToken: token.refreshToken,
  });
});

module.exports = router;
