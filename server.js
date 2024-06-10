const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const UserModel = require("./mongoose/model.js");
dotenv.config();
console.log(process.env.MONGOSTR);

mongoose.connection.on("connected", () => {
  console.log("Mongoose is connected!");
});

const app = express();
app.use(express.json());
app.use("/", require("./routes/hello.js"));
app.use("/register", require("./api/register.js"));
app.use("/login", require("./api/login"));
app.use("/user", require("./api/user"));
app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await mongoose.connect(process.env.MONGOSTR);
});


