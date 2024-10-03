const express = require('express');

const app = express();

app.get("/users", (req, res, next) => {
    //res.send("Response");
    next();
}, (req, res, next) => {
    //res.send("2nd Response")
    console.log("2nd Response")
    next();
}, (req, res, next) => {
    console.group("3rd Response")
    next();
}, (req, res, next) => {
    console.log("4th Response")
    res.send("4th Response")
})


app.listen(3000, () => {
    console.log('Server Started Successfully');
});