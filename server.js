const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserModel = require("./mongoose/UserSchema.js");
const RoleModel = require("./mongoose/RoleSchema.js");
const ExamModel = require("./mongoose/Exam.js");
const QuestionModel = require("./mongoose/QuestionSchema.js");
const SubmissionModel = require("./mongoose/Submission.js");
const ResultModel = require("./mongoose/Result.js");
const authRouter = require("./routes/auth.js");
dotenv.config();
console.log(process.env.MONGOSTR);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await mongoose.connect(process.env.MONGOSTR);
});
