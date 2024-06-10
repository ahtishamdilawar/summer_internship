const express = require("express");
const router = express.Router();
const path = require("path");
router.post("/", (req, res) => {
  console.log(req.body);
});

module.exports = router;
