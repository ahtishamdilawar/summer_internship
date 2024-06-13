const express = require("express");
const router = express.Router();
const path = require("path");

const createExamController = require("../../controllers/teacher/createExam.js");

router.use("/createExam", createExamController);

module.exports = router;
