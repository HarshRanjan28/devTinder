const express = require("express");
const {userAuth} = require("../middlewares/auth");
const {validateProfileEditData} = require("../utils/validator");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

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
        res.send(`${loggedInUser.firstName} Your profile updated Successfully`);
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
});

router.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["interested", "ignore"];

        if (!allowedStatus.includes(status)) {
            throw new Error("Not a valid Status");
        }

        const toUser = await User.findById(toUserId);
        if (!toUser) {
            throw new Error("User not found");
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId},
            ],
        });

        if (existingConnectionRequest) {
            return res.status(400).send("Connection Request already Exist!!");
        }

        const connectionRequest = await ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });
        const data = await connectionRequest.save();
        res.json({message: "Connection Request sent successfully!", data});
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
});

module.exports = router;
