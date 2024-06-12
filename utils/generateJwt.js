const jwt = require("jsonwebtoken");
require("dotenv").config();

async function generatejwt(user) {
  const acessToken = jwt.sign({ user }, process.env.JWT, { expiresIn: "1h" });
  const refreshToken = jwt.sign({ user }, process.env.REFRESH, {
    expiresIn: "1d",
  });
  return { acessToken, refreshToken };
}

module.exports = generatejwt;
