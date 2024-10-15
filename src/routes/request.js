const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middleWare/auth');
const ConnectionRequest = require('../models/connecttionRequest');
const User = require('../models/user');

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const user = req.user;
        const fromUserId = user._id;
        const toUserId = req.params.toUserId;
        const status = req.params.status;

        const allowedStatus = ["ignored", "interested"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).send("Invalid status Type");
        }

        const userexist = await User.findById(toUserId);
        if (!userexist) {
            return res.status(400).status("User not Found");
        }

        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                {fromUserId, toUserId},
                {fromUserId: toUserId, toUserId: fromUserId}
            ]
        });

        if (existingConnectionRequest) {
            return res.status(400).send("Request Already Exist");
        }

        const connectionRequest = new ConnectionRequest({fromUserId, toUserId, status})

        const data = await connectionRequest.save();

        res.json({message: 'Request sent Successfully', data})

    }
    catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
    const user = req.user;

    //sending the connection request
    res.send(user.firstName + " Sent the connection request")
});

module.exports = requestRouter