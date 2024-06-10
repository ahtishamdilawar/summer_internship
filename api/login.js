const express = require("express");
const router = express.Router();
const path = require("path");
const UserModel = require("../mongoose/model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
   

    const { username, password } = req.body;
    const existingUser = await UserModel.findOne({ username });
    if (!existingUser) {
        res.send("User does not exist");
        return;
    }
    const validPass = await bcrypt.compare(password, existingUser.password);
    if (!validPass) {
        res.send("Invalid password");
    }
    const token = generatejwt(existingUser);

    res.send(token);
});


function generatejwt(user) {
    return jwt.sign({ user }, process.env.JWT, { expiresIn: "1h" });
}
module.exports = router;