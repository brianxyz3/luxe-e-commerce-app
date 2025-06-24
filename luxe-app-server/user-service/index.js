if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const catchAsync = require("../shared/utlis/catchAsync.js");
const hashSaltRounds = 10;

const User = require("./models/user.js");
const ExpressError = require("../shared/utlis/ExpressError.js");
const generateToken = require("./utils/generateToken.js");


const mongoose = require("mongoose");

const dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});


const PORT = 3000;
const app = express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.post(
  "/auth/login",
  catchAsync(async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.find({ email });
      
      
      const isPassword = await bcrypt
        .compare(password, user[0].password)
        .catch((err) => console.log("Bcrypt error occurred: " + err));
        if (isPassword) {
          const token = generateToken(email);

          const data = {
            email: user.email,
            id: user._id,
            token,
            message: "User Logged In Successfully",
          };

          res.status(200).json(data);
        } else {
          res.status(401).json({ message: "Incorrect email/Password" });
        }
    } catch (error) {
      throw new ExpressError(`Internal Server Error: ${error}`, 500)
    }
  })
);

app.post(
  "/auth/register",
  catchAsync(async (req, res) => {
    try {
      const {firstName, lastName, email, password} = req.body;
      const hashedPassword = await bcrypt.hash(password, hashSaltRounds);
      const newUser = new User({
        firstName,
        lastName,
        email,
        userRole: "admin",
        password: hashedPassword
      });
      
      const token = generateToken(email);
      
      const savedUser = await newUser.save().catch(err => console.log(err))

      console.log("saved");

      const data = {
        email: savedUser.email,
        id: savedUser._id,
        token,
        message: "User Registered Successfully"
      };
      res.status(201).json(data);
    } catch (err) {
      console.log(`Error occurred in registring new user: ${err}`); 
      return; 
    }
  })
);

app.post("/signOut", (req, res) => {
  const token = req.body;
  // expire token
  res.json();
});


app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something Went Wrong. Try Again" } = err;
  res.status(statusCode).json(`${statusCode} ${message}`);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
