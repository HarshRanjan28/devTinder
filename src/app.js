const express = require("express");

const app = express();
const connectDB = require("./config/databases");
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/auth');
const profileRouter = require('./routes/profile');
const requestRouter = require('./routes/request');
const userRouter = require('./routes/user');

app.use("/", authRouter)
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter)


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
