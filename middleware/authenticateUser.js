const UserModel = require("../mongoose/UserSchema.js");
require("dotenv").config();
const authenticateUser = async (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  if (!token) {
    res.send("No token provided");
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT);

    const user = await UserModel.findOne({ _id: decoded.id });
    console.log(user);
    if (!user) {
      res.send("User not found");
      return;
    }

    // Attach the user to the request object
    req.user = user;
    console.log("valid user");
    next();
  } catch (error) {
    return res.status(401).send("Invalid token");
  }
};

module.exports = authenticateUser;
