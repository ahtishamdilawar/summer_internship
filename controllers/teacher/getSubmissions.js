const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const ExamModel = require("../../models/ExamsSchema.js");
const SubmissionModel = require("../../models/Submission.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const getRole = require("../../middleware/roles.js");

router.get("/:examId", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Teacher") return res.status(403).send("Forbidden");

  const { examId } = req.params;

  try {
    const exam = await ExamModel.findOne({
      _id: examId,
      teacherID: req.user._id,
    });

    if (!exam) {
      return res
        .status(404)
        .json({ message: "Exam not found or not authorized" });
    }

    const submissions = await SubmissionModel.find({
      examID: examId,
    }).populate("student_id", "name email");

    res.status(200).json({ submissions });
  } catch (error) {
    res.status(500).json({ message: "Error fetching submissions", error });
  }
});

module.exports = router;
