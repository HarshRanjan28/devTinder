
const mongoose = require("mongoose");

const DB_URI =
    "mongodb+srv://mongotuts:Harshranjan28@cluster0.vjcmj.mongodb.net/Dev-Tinder";

const connectDB = async () => {
    await mongoose.connect(DB_URI);
};

module.exports = connectDB;

