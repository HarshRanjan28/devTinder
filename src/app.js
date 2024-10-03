const express = require('express');

const app = express();
const {adminAuth} = require('./middleWare/auth')



app.get("/admin/getAllData", adminAuth, (req, res) => {
    res.send("All Data Sent")
})

app.delete("/admin/deleteAllData", adminAuth, (req, res) => {
    res.send("Data Deleted")
})

app.listen(3000, () => {
    console.log('Server Started Successfully');
});