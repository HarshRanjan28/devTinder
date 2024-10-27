const validator = require("validator");

const validateSignUpData = (req) => {
    const {firstName, lastName, emailId, password, age} = req.body;
    if (!firstName || !lastName) {
        throw new Error("Name is not valid");
    } else if (!validator.isEmail(emailId)) {
        throw new Error("Email is not valid");
    } else if (!validator.isStrongPassword(password)) {
        throw new Error("Please enter a strong password");
    }
};

const validateProfileEditData = (req) => {
    const allowedFields = [
        "firstName",
        "lastName",
        "skills",
        "about",
        "gender",
        "age",
    ];
    const isEditAllowed = Object.keys(req.body).every((field) =>
        allowedFields.includes(field)
    );

    return isEditAllowed;
};

module.exports = {validateSignUpData, validateProfileEditData};
