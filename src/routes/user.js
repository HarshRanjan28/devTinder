const express = require("express");

const router = express.Router();
const {userAuth} = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

const USER_SAFE_DATA = "firstName lastName age gender about skills photoURL";

router.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionrequest = await connectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        });
        res.json({message: "Data Fetched Successfully", data: connectionrequest});
    } catch (err) {
        res.status(400).send("ERROR: " + err.message);
    }
});

router.get("/user/connections", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;

        const connectionRequests = await connectionRequest
            .find({
                $or: [
                    {toUserId: loggedInUser._id, status: "accepted"},
                    {fromUserId: loggedInUser._id, status: "accepted"},
                ],
            })
            .populate("fromUserId", ["firstName", "lastName"])
            .populate("toUserId", ["firstName", "lastName"]);
        const data = connectionRequests.map((res) => {
            if (res.fromUserId.toString() === loggedInUser._id.toString()) {
                return res.toUserId;
            }
            return res.fromUserId;
        });
        res.json({data});
    } catch (err) {
        res.status(400).send({message: err.message});
    }
});

router.get("/user/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit > 25 ? 25 : limit;
        const skip = (page - 1) * limit;
        const connectionrequests = await connectionRequest.find({
            $or: [
                {fromUserId: loggedInUser._id},
                {toUserId: loggedInUser._id}
            ]
        }).select("fromUserId toUserId")
        const hideUsersFromFeed = new Set();
        connectionrequests.forEach(req => {
            hideUsersFromFeed.add(req.fromUserId.toString());
            hideUsersFromFeed.add(req.toUserId.toString());
        })

        const users = await User.find({
            $and: [
                {_id: {$nin: Array.from(hideUsersFromFeed)}},
                {_id: {$ne: loggedInUser._id}}
            ]
        }).select(USER_SAFE_DATA).skip(skip).limit(limit);

        res.send(users);
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message)
    }
})

module.exports = router;
