if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const connectDb = require("../shared/database/connection.js");


const PORT = 3000;
const app = express();
app.use(express.json());

connectDb();


app.get("/posts", (req, res) => {
  res.json(post);
});

app.post("/login", (req, res) => {
  const { email } = req.body;

  jwt.sign();
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
