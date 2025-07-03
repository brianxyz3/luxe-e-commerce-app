if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const catchAsync = require("../shared/utlis/catchAsync");

const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", () => console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.post("/order/:userId",
    catchAsync(async (req, res) => {
        const {userId} = req.params;
        console.log(userId);
        res.status(200).json();
    })
)

app.listen(port, () => {
    console.log(`LListening on port ${port}`)
})