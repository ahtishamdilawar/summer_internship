const express = require("express");
const router = express.Router();
const path = require("path");
const ExamsModel = require("../../models/ExamsSchema.js");
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

module.exports = router;
