const express = require('express');
const {userAuth} = require('../middlewares/auth');
const router = express.Router();

router.post("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;
    res.send(user.firstName + " Sent the connection Request");
})

module.exports = router;