const jwt = require("jsonwebtoken");
const User = require("../models/user");
const userAuth = async (req, res, next) => {
    try {
        const cookies = req.cookies;

        const {token} = cookies;
        if (!token) {
            throw new Error("Not a valid Token");
        }
        const decodedMessage = await jwt.verify(token, "DEV@Tinder$2815");
        const {_id} = decodedMessage;

        const user = User.findById(_id);
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
