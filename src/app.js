const express = require("express");
const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

app.post("/signup", async (req, res) => {
    const userObj = {
        firstName: "Harsh",
        lastName: "Ranjan",
        emailId: "harshranjan@gamil.com",
        password: "12345",
    };
    const user = new User(userObj);
    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving User Data:" + err.message);
    }
});

connectDB()
    .then(() => {
        console.log("Database Connected Successfully");
        app.listen(3000, () => {
            console.log("Server Started Successfully");
        });
    })
    .catch((err) => {
        console.error("Database cannot be connected!!");
    });
