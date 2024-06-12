const UserModel = require("../models/UserSchema.js");
const jwt = require("jsonwebtoken");
const refreshtokenSchema = require("../models/refreshToken.js");
require("dotenv").config();

const authenticateUser = async (req, res, next) => {
  const { accesstoken, refreshtoken } = req.headers;
  console.log(req.headers);
  if (!accesstoken) {
    res.send("No token provided");
    return;
  }

  try {
    const decoded = jwt.verify(accesstoken, process.env.JWT);
    const decodedRefresh = jwt.verify(refreshtoken, process.env.REFRESH);
    const savedrefreshtoken = await refreshtokenSchema.findOne({
      token: refreshtoken,
    });
    if (!savedrefreshtoken) {
      res.send("Invalid Refresh token Login again");
      return;
    }

    const user = await UserModel.findOne({ _id: decoded.user._id });

    if (!user || user._id.toString() !== decodedRefresh.user._id) {
      res.send("User not found");
      return;
    }

    req.user = user;
    console.log("valid user");
    next();
  } catch (error) {
    console.log(error);
    if (!refreshtoken) {
      res.send("No token provided");
      return;
    } else {
      res.redirect("/auth/refresh");
    }
  }
};

module.exports = authenticateUser;
