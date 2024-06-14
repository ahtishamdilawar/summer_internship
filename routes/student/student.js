const express = require("express");
const router = express.Router();
const path = require("path");
const getExamsController = require("../../controllers/students/getExams.js");
router.use("/getExams", getExamsController);
module.exports = router;
