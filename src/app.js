const express = require("express");

const app = express();

app.use("/hello", (req, res) => {
    res.send("Hello from the hello route");
});

app.use("/hello/2", (req, res) => {
    res.send("This is the 2nd hello route");
})

app.use("/test", (req, res) => {
    res.send("Hello from the test route");
});

app.use("/", (req, res) => {
    res.send("Hello from the Home route");
});

app.listen(3000, () => {
    console.log("Server is running successfully on port 3000");
});
