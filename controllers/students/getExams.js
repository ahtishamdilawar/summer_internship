const express = require("express");
const router = express.Router();
const path = require("path");
const ExamsModel = require("../../models/ExamsSchema.js");
const QuestionModel = require("../../models/QuestionSchema.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const getRole = require("../../middleware/roles.js");

router.get("/", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Student") return res.status(403).send("Forbidden");

  try {
    const exams = await ExamsModel.find({ status: "published" });
    res.status(200).json({ exams });
  } catch (error) {
    res.status(500).json({ message: "Error fetching exams", error });
  }
});

router.get("/:examId", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Student") return res.status(403).send("Forbidden");

  const { examId } = req.params;

  try {
    const exam = await ExamsModel.findOne({ _id: examId, status: "published" });

    if (!exam) {
      return res
        .status(404)
        .json({ message: "Exam not found or not accessible" });
    }

    const questions = await QuestionModel.find({ examID: examId });

    const examWithQuestions = { ...exam.toObject(), questions };

    res.status(200).json({ exam: examWithQuestions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching exam details", error });
  }
});

module.exports = router;
