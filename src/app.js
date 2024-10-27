const express = require("express");

const app = express();
const connectDB = require("./config/databases");
const User = require("./models/user");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const {userAuth} = require('./middlewares/auth');

app.use(express.json());
app.use(cookieParser());


app.post("/signup", async (req, res) => {

    const user = new User(req.body);
    try {
        const passwordHash = await bcrypt.hash(user.password, 10);
        user.password = passwordHash;
        await user.save();
        res.status(200).send("User added Successfully");
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }

})

app.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});

        if (!user) {
            throw new Error("Invalid Credentials");
        }
        const isPasswordValid = user.validatePassword(password);
        if (isPasswordValid) {

            const token = user.getJWT()
            res.cookie('token', token);

            res.send("Login Successfull");
        } else {
            throw new Error("Invalid credentials");
        }
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
})

app.get("/profile", userAuth, async (req, res) => {
    try {
        const user = req.user;
        res.json({message: 'Fetched Successfully', user})
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message);
    }

})

app.post("/sendConnectionRequest", userAuth, (req, res) => {
    const user = req.user;
    res.send(user.firstName + " Sent the connection Request");
})

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.json({message: 'Fetched users Successfully', users});
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
})

app.delete("/user", async (req, res) => {
    const id = req.body.userId;
    try {
        await User.findByIdAndDelete(id);
        res.send("User deleted Successfully");
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
})

app.patch("/user", async (req, res) => {
    const data = req.body;
    const userId = req.body.userId;
    try {
        await User.findByIdAndUpdate({_id: userId}, data, {
            returnDocument: 'before'
        })
    }
    catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
})

connectDB()
    .then(() => {
        console.log("Database connected Successfully");
        app.listen(3000, () => {
            console.log("Server is running successfully on port 3000");
        });
    })
    .catch((err) => {
        console.log("Error connecting to Database!!" + err);
    });
