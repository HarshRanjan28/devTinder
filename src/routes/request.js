const express = require('express');
const requestRouter = express.Router();
const {userAuth} = require('../middleWare/auth');

requestRouter.get("/sendConnectionRequest", userAuth, async (req, res) => {
    const user = req.user;

    //sending the connection request
    res.send(user.firstName + " Sent the connection request")
});

module.exports = requestRouter