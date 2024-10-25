const express = require("express");

const app = express();
const connectDB = require("./config/databases");

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
