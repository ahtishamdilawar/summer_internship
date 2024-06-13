const express = require("express");
const router = express.Router();
const ExamModel = require("../../models/Exam.js");
const QuestionModel = require("../../models/QuestionSchema.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const getRole = require("../../middleware/roles.js");
const mongoose = require("mongoose");

router.put("/:examId", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Teacher") return res.status(403).send("Forbidden");

  const { examId } = req.params;
  const { title, description, duration, questions } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const exam = await ExamModel.findOne({
      _id: examId,
      teacherID: res.locals.user._id,
    });

    if (!exam) {
      await session.abortTransaction();
      session.endSession();
      return res
        .status(404)
        .json({ message: "Exam not found or not authorized" });
    }

    // Update exam details if provided
    if (title !== undefined) exam.title = title;
    if (description !== undefined) exam.description = description;
    if (duration !== undefined) exam.duration = duration;

    await exam.save({ session });

    await session.commitTransaction();
    session.endSession();

    const updatedExam = await ExamModel.findById(examId);

    return res
      .status(200)
      .json({ message: "Exam updated successfully", exam: updatedExam });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    return res.status(500).json({ message: "Error updating exam", error });
  }
});

module.exports = router;
