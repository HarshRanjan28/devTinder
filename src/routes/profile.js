const express = require('express');
const profileRouter = express.Router();
const {userAuth} = require('../middleWare/auth');

// profile router

profileRouter.get("/profile", userAuth, (req, res) => {
    try {
        const user = req.user;
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

module.exports = profileRouter

