const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../middleWare/auth");
const {validateUserProfileData} = require("../utils/validation");

// profile router

profileRouter.get("/profile/view", userAuth, (req, res) => {
    try {
        const user = req.user;
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
    try {
        if (!validateUserProfileData(req, res)) {
            throw new Error("Invalid Edit Request");
        }
        const loggedInUser = req.user;
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
        await loggedInUser.save();
        res
            .status(201)
            .json({
                message: `${loggedInUser.firstName}  Your Profile Updated Successfully`,
                data: loggedInUser,
            });
    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
});

module.exports = profileRouter;
