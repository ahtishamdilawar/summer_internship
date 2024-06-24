const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  submission_id: {
    type: Schema.Types.ObjectId,
    ref: "Submission",
    required: true,
    unique: true,
  },
  score: {
    type: Number,
    required: true,
  },
  feedback: {
    type: String,
  },
});

const Result = mongoose.model("Result", ResultSchema);
module.exports = Result;
