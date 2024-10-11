const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../models/user");
const {validateSignUpData} = require('../utils/validation');
const authRouter = express.Router();

// signup route 

authRouter.post("/signup", async (req, res) => {
    try {
        //validate the data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        //Encrypt Password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        //creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
        });

        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
});

//login route 

authRouter.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = user.validatePassword(password);
        if (isPasswordValid) {
            const token = await user.getJWT();

            // add the token to cookie and send the response back to user
            res.cookie("token", token);

            res.status(200).send("Login Successfull!!");
        } else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

authRouter.post("/logout", (req, res) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
    });
    res.send("Logout Successfull!!")
})

module.exports = authRouter