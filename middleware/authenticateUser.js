const UserModel = require("../mongoose/UserSchema.js");
const jwt = require("jsonwebtoken");
const RefreshTokenSchema = require("../mongoose/refreshToken.js");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  const { AccessToken, RefreshToken } = req.headers;

  if (!AccessToken) {
    res.send("No token provided");
    return;
  }

  try {
    const decoded = jwt.verify(AccessToken, process.env.JWT);
    const decodedRefresh = jwt.verify(RefreshToken, process.env.REFRESH);
    const savedRefreshToken = await RefreshTokenSchema.findOne({
      token: RefreshToken,
    });
    if (!savedRefreshToken) {
      res.send("Invalid Refresh token Login again");
      return;
    }

    const user = await UserModel.findOne({ _id: decoded.user._id });

    console.log("user");
    console.log(user);
    if (!user || user._id !== refreshDecoded.user._id) {
      res.send("User not found");
      return;
    }

    req.user = user;
    console.log("valid user");
    next();
  } catch (error) {
    if (!RefreshToken) {
      res.send("No token provided");
      return;
    } else {
      res.redirect("/auth/refresh");
    }
  }
};

module.exports = authenticateUser;
