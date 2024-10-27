const express = require('express');
const {userAuth} = require('../middlewares/auth');

const router = express.Router();


router.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json({message: 'Fetched Successfully', user})
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message);
    }

})

module.exports = router