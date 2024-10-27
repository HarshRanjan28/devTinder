const express = require("express");
const {userAuth} = require("../middlewares/auth");
const {validateProfileEditData} = require("../utils/validator");

const router = express.Router();

router.get("/profile/view", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.send(user);
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
});

router.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateProfileEditData) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res.send(`${loggedInUser.firstName} Your profile updated Successfully`)
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
});

module.exports = router;
