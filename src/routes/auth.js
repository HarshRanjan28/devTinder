const express = require('express');
const validateSignUpData = require('../utils/validator');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const {userAuth} = require('../middlewares/auth');

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        validateSignUpData(req);
        const user = new User(req.body);
        const passwordHash = await bcrypt.hash(user.password, 10);
        user.password = passwordHash;
        await user.save();
        res.status(200).send("User added Successfully");
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }

})

router.post("/login", userAuth, async (req, res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});

        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = user.validatePassword(password);
        if (isPasswordValid) {

            const token = user.getJWT()
            res.cookie('token', token);

            res.send("Login Successfull");
        } else {
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
})

module.exports = router;