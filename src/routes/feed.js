const express = require('express');
const User = require('../models/user');
const feedRouter = express.Router();


feedRouter.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

module.exports = feedRouter