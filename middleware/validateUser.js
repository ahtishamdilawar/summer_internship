const UserModel = require("../models/UserSchema.js");

async function validateUser(req, res, next) {
  const { username, password, email, role } = req.body;

  if (!username || !password) {
    return res.status(400).send("Invalid username or password");
  }

  if (email || role) {
    if (!email) {
      return res.status(400).send("Invalid email");
    }
    if (role !== "Student" && role !== "Teacher") {
      return res.status(400).send("Invalid role");
    }
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).send("User already exists");
    }
    req.isRegistration = true;
  } else {
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
      return res.status(400).send("User does not exist");
    }
    res.locals.user = existingUser;
    req.isRegistration = false;
  }

  next();
}

module.exports = validateUser;
