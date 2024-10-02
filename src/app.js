const express = require('express');

const app = express();


app.use("/users", (req, res) => {
    res.send("This route will match with all HTTP methods")
})

app.get("/users", (req, res) => {
    res.send({firstName: "Harsh", lastName: "Ranjan"});
})

app.post("/users", (req, res) => {
    res.send("Data Successfully saved to Database");
})

app.delete("/users", (req, res) => {
    res.send("Data Deleted Successfully");
})


app.listen(3000, () => {
    console.log('Server Started Successfully');
});