const express = require("express");
const router = express.Router();
const ExamModel = require("../../models/ExamsSchema.js");
const QuestionModel = require("../../models/QuestionSchema.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const getRole = require("../../middleware/roles.js");

router.get("/", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Teacher") return res.status(403).send("Forbidden");

  try {
    const exams = await ExamModel.find({ teacherID: req.user._id });

    const examsWithQuestions = [];
    for (const exam of exams) {
      const questions = await QuestionModel.find({ examID: exam._id });
      examsWithQuestions.push({ ...exam.toObject(), questions });
    }

    res.send(examsWithQuestions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams", error });
  }
});

module.exports = router;
