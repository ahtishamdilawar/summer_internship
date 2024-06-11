const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubmissionSchema = new Schema({
  examID: {
    type: Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
  student_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  submitted_at: {
    type: Date,
    default: Date.now,
  },
  answers: [
    {
      questionID: {
        type: Schema.Types.ObjectId,
        ref: "Question",
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

const Submission = mongoose.model("Submission", SubmissionSchema);
module.exports = Submission;
