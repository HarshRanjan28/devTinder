const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://mongotuts:Harshranjan28@cluster0.vjcmj.mongodb.net/Dev-Tinder");
}

module.exports = connectDB;



