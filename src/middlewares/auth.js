const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    try {
        const cookie = req.cookies;

        const {token} = cookie;
        if (!token) {
            return res.status(401).send("Please Login")
        }
        const decodedMessage = await jwt.verify(token, "DEV@Tinder$2815");
        const {_id} = decodedMessage;

        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
};

module.exports = {
    userAuth,
};
