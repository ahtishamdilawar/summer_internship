const express = require("express");
const router = express.Router();
const path = require("path");
const QuestionModel = require("../../models/QuestionSchema.js");
const ExamModel = require("../../models/Exam.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const getRole = require("../../middleware/roles.js");

router.get("/:examId/", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Teacher") return res.status(403).send("Forbidden");
  const { examId } = req.params;
  try {
    const questions = await QuestionModel.find({ examID: examId });
    res.send(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
});

module.exports = router;
