const express = require("express");
const router = express.Router();
const path = require("path");
const loginController = require("../controllers/login.js");
const registerController = require("../controllers/register.js");
const userController = require("../controllers/user.js");

router.use("/register", registerController);
router.use("/login", loginController);
router.use("/user", userController);

module.exports = router;
