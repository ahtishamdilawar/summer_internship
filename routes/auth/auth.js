const express = require("express");
const router = express.Router();
const path = require("path");
const loginController = require("../../controllers/auth/login.js");
const registerController = require("../../controllers/auth/register.js");
const userController = require("../../controllers/auth/user.js");
const refreshTokenController = require("../../controllers/auth/refresh.js");
const logoutController = require("../../controllers/auth/logout.js");
const roleController = require("../../controllers/auth/role.js");
router.use("/register", registerController);
router.use("/login", loginController);
router.use("/user", userController);
router.use("/refresh", refreshTokenController);
router.use("/logout", logoutController);
router.use("/role", roleController);

module.exports = router;
