const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const SubmissionModel = require("../../models/Submission.js");
const ResultModel = require("../../models/Result.js");
const ExamModel = require("../../models/ExamsSchema.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const getRole = require("../../middleware/roles.js");

router.post("/:submissionId", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Teacher") return res.status(403).send("Forbidden");

  const { submissionId } = req.params;
  const { score, feedback } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const submission = await SubmissionModel.findById(submissionId).session(
      session
    );

    if (!submission) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Submission not found" });
    }

    const exam = await ExamModel.findOne({
      _id: submission.examID,
      teacherID: res.locals.user._id,
    }).session(session);

    if (!exam) {
      await session.abortTransaction();
      session.endSession();
      return res.status(403).json({
        message: "cannot store",
      });
    }

    const newResult = new ResultModel({
      submission_id: submissionId,
      score: score,
      feedback: feedback,
    });

    await newResult.updateOne(
      { submission_id: submissionId },
      { score, feedback },
      { session, upsert: true }
    );

    await session.commitTransaction();
    session.endSession();

    return res
      .status(200)
      .json({ message: "Result stored successfully", result: newResult });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Error storing result", error });
  }
});

module.exports = router;
