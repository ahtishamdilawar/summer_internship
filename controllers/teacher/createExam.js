const express = require("express");
const router = express.Router();
const path = require("path");
const authenticateUser = require("../../middleware/authenticateUser");
const getRole = require("../../middleware/roles");
const Exam = require("../../models/Exam");
const Question = require("../../models/QuestionSchema");
const mongoose = require("mongoose");
router.post("/", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Teacher") return res.status(403).send("Forbidden");
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { title, description, duration, questions } = req.body;
    const exam = new Exam({
      teacherID: req.user._id,
      title,
      description,
      duration,
    });

    await exam.save({ session });

    for (const question of questions) {
      const newQuestion = new Question({
        examID: exam._id,
        text: question.text,
        options: question.options,
        correctAnswer: question.correctAnswer,
      });
      await newQuestion.save({ session });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    return res.status(400).send(err.message);
  }

  res.send("Exam created successfully");
});

module.exports = router;
