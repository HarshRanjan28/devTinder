const mongoose = require('mongoose');
const validator = require('validator');
const {Schema} = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Not a strong Password");
            }
        }
    },
    age: {
        type: String,
        validate(value) {
            if (!["male", "female", "others"].includes(value)) {
                throw new Error("Not a valid Gender")
            }
        }
    },
    gender: {
        type: String
    }
}, {
    timestamps: true
});

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id}, "DEV@Tinder$2815", {expiresIn: '1d'});
    return token;
}

userSchema.methods.validatePassword = async function (password) {
    const user = this;
    const isPasswordValid = bcrypt.compare(password, user.password);
    return isPasswordValid;
}

const User = mongoose.model("User", userSchema);

module.exports = User;