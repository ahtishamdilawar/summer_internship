const express = require("express");
const router = express.Router();
const path = require("path");
const accessExamsController = require("../../controllers/teacher/accessExams.js");
const createExamController = require("../../controllers/teacher/createExam.js");
const editExamController = require("../../controllers/teacher/editExam.js");
const getQuestionsController = require("../../controllers/teacher/getQuestions.js");
const editQuestionController = require("../../controllers/teacher/editQuestion.js");
router.use("/createExam", createExamController);
router.use("/accessExams", accessExamsController);
router.use("/editExam", editExamController);
router.use("/getQuestions", getQuestionsController);
router.use("/editQuestion", editQuestionController);
module.exports = router;
