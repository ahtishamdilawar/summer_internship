const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const studentRouter = require("./routes/student/student.js");
const authRouter = require("./routes/auth/auth.js");
const teacherRouter = require("./routes/teacher/teacher.js");
dotenv.config();
console.log(process.env.MONGOSTR);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

const app = express();
app.use(express.json());
app.use("/auth", authRouter);
app.use("/teacher", teacherRouter);
app.use("/student", studentRouter);

app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await mongoose.connect(process.env.MONGOSTR);
});
