const adminAuth = (req, res, next) => {
    const token = "xyzas";
    const isAdminAuthorized = token === "xyz";
    if (isAdminAuthorized) {
        next();
    } else {
        res.status(401).send("Unauthorized Access");
    }
};

module.exports = {
    adminAuth
}