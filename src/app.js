const express = require("express");
const connectDB = require("./config/database");
const {validateSignUpData} = require("./utils/validation");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();

const User = require("./models/user");

app.use(express.json());
app.use(cookieParser())

//creating the user

app.post("/signup", async (req, res) => {
    try {
        //validate the data
        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        //Encrypt Password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);

        //creating a new instance of the user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash
        })

        await user.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(400).send("ERROR " + err.message);
    }
});

//signin the user 

app.post("/login", async (req, res) => {
    try {
        const {emailId, password} = req.body;
        const user = await User.findOne({emailId: emailId});
        if (!user) {
            throw new Error("Invalid credentials");
        }
        const isPasswordValid = bcrypt.compare(password, user.password);
        if (isPasswordValid) {

            //create a JWT Token
            const token = await jwt.sign({_id: user._id}, "DEV@Tinder$2815");

            // add the token to cookie and send the response back to user
            res.cookie("token", token);

            res.status(200).send("Login Successfull!!")
        }
        else {
            throw new Error("Invalid credentials");
        }
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

//getting the user profile

app.get("/profile", async (req, res) => {
    try {
        const cookies = req.cookies;
        const {token} = cookies;
        if (!token) {
            throw new Error("Invalid Token");
        }

        const decodedMessage = await jwt.verify(token, "DEV@Tinder$2815");
        const {_id} = decodedMessage;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("No user found");
        }
        res.status(200).send(user);
    } catch (err) {
        res.status(400).send("ERROR : " + err.message);
    }
})

//getting the data of particular user based on emailID

app.get("/user", async (req, res) => {
    const userObj = new User(req.body);
    try {
        const user = await User.findOne({emailId: userObj.emailId});
        if (!user) {
            res.status(401).send("No user found");
        } else {
            res.send(user);
        }
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//fetching all the users

app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//deleting the user based on given emailID

app.delete("/deleteuser", async (req, res) => {
    const emailId = req.body.emailId;
    try {
        await User.findOneAndDelete({emailId: emailId});
        res.send("Deleted the user successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
    }
});

//updating the user based on given ID

app.patch("/updateuser", async (req, res) => {
    const userId = req.body.userId;
    const updatedData = req.body;
    try {
        await User.findOneAndUpdate({_id: userId}, updatedData);
        res.send("User updated successfully");
    } catch (err) {
        res.status(400).send("Something went wrong");
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
