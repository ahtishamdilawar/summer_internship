const RoleModel = require("../models/RoleSchema.js");

const returnRoles = async (req, res, next) => {
  const roles = await RoleModel.find();
  if (!roles) return res.status(400).send("No roles found");
  //create a json with roles
  const rolesJson = {};
  roles.forEach((role) => {
    rolesJson[role._id.toString()] = role.name;
  });
  res.locals.roles = rolesJson;
  next();
};
