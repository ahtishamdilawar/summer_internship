const express = require("express");
const router = express.Router();
const path = require("path");
const accessExamsController = require("../../controllers/teacher/accessExams.js");
const createExamController = require("../../controllers/teacher/createExam.js");

router.use("/createExam", createExamController);
router.use("/accessExams", accessExamsController);
module.exports = router;
