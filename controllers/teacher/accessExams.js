const express = require("express");
const router = express.Router();
const path = require("path");
const ExamModel = require("../../models/Exam.js");
const authenticateUser = require("../../middleware/authenticateUser.js");
const getRole = require("../../middleware/roles.js");

router.get("/", authenticateUser, getRole, async (req, res) => {
  if (res.locals.role !== "Teacher") return res.status(403).send("Forbidden");
  const exams = await ExamModel.find({ teacherID: req.user._id });
  res.send(exams);
});

module.exports = router;
