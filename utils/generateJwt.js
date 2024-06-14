const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generatejwt(user) {
  const accessToken = jwt.sign({ user }, process.env.JWT, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ user }, process.env.REFRESH, {
    expiresIn: "1d",
  });
  return { accessToken, refreshToken };
}

module.exports = generatejwt;
