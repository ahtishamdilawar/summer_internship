const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const QuestionModel = require("../../models/QuestionSchema.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const ExamModel = require("../../models/ExamsSchema.js");
const getRole = require("../../middleware/roles.js");

router.post("/:questionId", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Teacher") return res.status(403).send("Forbidden");

  const { questionId } = req.params;
  const { text, options, correctAnswer } = req.body;
  console.log(res.locals.user);
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const question = await QuestionModel.findById(questionId).session(session);

    if (!question) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Question not found" });
    }

    const exam = await ExamModel.findOne({
      _id: question.examID,
      teacherID: res.locals.user._id,
    }).session(session);

    if (!exam) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(403)
        .json({ message: "Not authorized to update this question" });
    }

    if (text !== undefined) question.text = text;
    if (options !== undefined) question.options = options;
    if (correctAnswer !== undefined) question.correctAnswer = correctAnswer;

    await question.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ message: "Question updated successfully", question });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Error updating question", error });
  }
});

module.exports = router;
