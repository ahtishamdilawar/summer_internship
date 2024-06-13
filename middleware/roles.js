const RoleModel = require("../models/RoleSchema.js");

const returnRoles = async (req, res, next) => {
  const roles = await RoleModel.find();
  if (!roles) return res.status(400).send("No roles found");
  console.log(res.locals.user);
  //check role
  console.log(roles[1]._id);
  console.log(res.locals.user.roleID);
  if (res.locals.user.roleID.toString() == roles[0]._id.toString()) {
    res.locals.role = "Teacher";
  } else if (res.locals.user.roleID.toString() == roles[1]._id.toString()) {
    res.locals.role = "Student";
  } else {
    res.locals.role = "empty body";
  }
  console.log(res.locals.role);
  next();
};

module.exports = returnRoles;
