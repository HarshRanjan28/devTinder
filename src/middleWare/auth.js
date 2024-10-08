const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminAuth = (req, res, next) => {
    const token = "xyzas";
    const isAdminAuthorized = token === "xyz";
    if (isAdminAuthorized) {
        next();
    } else {
        res.status(401).send("Unauthorized Access");
    }
};


const userAuth = async (req, res, next) => {
    try {
        const {token} = req.cookies;

        if (!token) {
            throw new Error("Not a valid token");
        }

        const decodeObj = jwt.verify(token, "DEV@Tinder$2815");
        const {_id} = decodeObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not Found");
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(400).send("Invalid user " + err.message)
    }
}

module.exports = {
    adminAuth,
    userAuth
}