const express = require("express");
const connectDB = require("./config/database");

const app = express();

const User = require("./models/user");

app.use(express.json())

app.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("Error saving User Data:" + err.message);
    }
});

app.get("/user", async (req, res) => {
    const userObj = new User(req.body);
    try {
        const user = await User.findOne({emailId: userObj.emailId});
        if (!user) {
            res.status(401).send("No user found")
        }
        else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
})

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
