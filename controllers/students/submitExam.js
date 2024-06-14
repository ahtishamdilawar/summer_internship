const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const ExamModel = require("../../models/ExamsSchema.js");
const SubmissionModel = require("../../models/Submission.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const getRole = require("../../middleware/roles.js");

router.post("/:examId/submit", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Student") return res.status(403).send("Forbidden");

  const { examId } = req.params;
  const { answers } = req.body;

  if (!answers || !Array.isArray(answers)) {
    return res.status(400).json({
      message: "answer empty",
    });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const exam = await ExamModel.findOne({ _id: examId, status: "published" });

    if (!exam) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Exam not found" });
    }

    const newSubmission = new SubmissionModel({
      examID: examId,
      student_id: req.user._id,
      answers: answers.map((answer) => ({
        questionID: answer.questionID,
        answer: answer.answer,
      })),
    });

    await newSubmission.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({ message: "Submission successful" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Error submitting exam", error });
  }
});

module.exports = router;
