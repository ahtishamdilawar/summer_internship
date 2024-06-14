const express = require("express");
const router = express.Router();
const path = require("path");
const getExamsController = require("../../controllers/students/getExams.js");
const submitExamController = require("../../controllers/students/submitExam.js");
router.use("/getExams", getExamsController);
router.use("/submitExam", submitExamController);
module.exports = router;
