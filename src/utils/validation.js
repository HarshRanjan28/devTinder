const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password} = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is required");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Not a strong password");
    }
};

const validateUserProfileData = (req) => {
    const allowedEditFields = ["firstName", "lastName"];
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedEditFields.includes(field)
    );
    return isEditAllowed;
};

module.exports = {
    validateSignUpData,
    validateUserProfileData,
};
