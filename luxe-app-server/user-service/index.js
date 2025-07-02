if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const axios = require("axios");
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
      const { email, password, guestId } = req.body;
      const userArr = await User.find({ email });
      
      const user = userArr[0];
      
      const isPassword = await bcrypt
        .compare(password, user.password)
        .catch((err) => console.log("Bcrypt error occurred: " + err));
        if (isPassword) {
          const token = generateToken(email);
          
          if (guestId && guestId != "null") {
            const updateCartResponse = await axios({
              method: "GET",
              url: `http://localhost:4000/user/login/${guestId}/cart/update`,
              data: { userCart: user.cart },
            });

            user.cart = updateCartResponse.data.updatedCart;          

            await user.save();
          }          

          const data = {
            userDetail: {
              email: user.email,
              id: user._id,
              token,
            },
            cart: user.cart,
            message: "User Logged In Successfully",
          };

          res.status(200).json(data);
          
          if (guestId && guestId != "null") {
            axios({
              method: "DELETE",
              url: `http://localhost:4000/user/login/${guestId}/delete`,
            }).then(({status}) => {
              if(status == 200) console.log(guestId + ", Guest User Delete Successful");
              return;
            }).catch((err) => {
              console.log(`Error Occurred in Guest ${guestId} Delete. Try Again`);
              console.log(err);
            })
          }
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
        userDetail: {
          email: savedUser.email,
          id: savedUser._id,
          token,
        },
        message: "User Registered Successfully",
      };
      res.status(201).json(data);
    } catch (err) {
      console.log(`Error occurred in registring new user: ${err}`); 
      return; 
    }
  })
);
// app.post(
//   "/auth/register/guest",
//   catchAsync(async (req, res) => {
//     try {
//       const {guestId} = req.body;
      
//       const newGuest = new GuestUser({
//         guestId,
//       });
      
      
//       const savedGuest = await newGuest.save().catch((err) => console.log(err));

//       const data = {
//         guest: savedGuest,
//         message: "Guest Registered Successfully",
//       };
//       res.status(201).json(data);
//     } catch (err) {
//       console.log(`Error occurred in registring new user: ${err}`); 
//       return; 
//     }
//   })
// );

app.get("/auth/signOut", (req, res) => {
  // const token = req.body;
  // expire token
  res.status(200).json({message: "GoodBye, Come Back Soon."});
});


app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something Went Wrong. Try Again" } = err;
  res.status(statusCode).json(`${statusCode} ${message}`);
});


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
