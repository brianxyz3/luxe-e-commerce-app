if(process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const catchAsync = require("../shared/utlis/catchAsync");
const User = require("./models/user.js");
const Order = require("./models/order.js");
const axios = require("axios");


const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

mongoose.connect(dbUrl);

const db = mongoose.connection;

db.on("error", () => console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
})

const app = express();
app.use(express.json());
app.use(cors());

app.post(
  "/order/:userId",
  catchAsync(async (req, res) => {
    const {userId} = req.params;
    const {deliveryAddress, paymentOption} = req.body;
    const deliveryFee = 150;

    const user = await User.findById(userId).catch(err => console.log(err))
    
    const totalAmount = user.cart.reduce(
      (total, currItem) => total + currItem.price * currItem.units,
      deliveryFee
    );


    const newOrder = new Order({
      cart: user.cart,
      status: "Pending",
      orderBy: user._id,
      deliveryAddress,
      paymentOption,
      totalAmount: Math.floor(totalAmount),
    });

    // await newOrder.save();

    user.order.push(newOrder._id);
    user.cart = [];

    // console.log(user)
    // console.log(newOrder)

    // await user.save();
    res.status(201).json();

    axios({
      method: "PUT",
      url: `http://localhost:7000/inventory/confirmedOrder/update`,
      data: { cart: newOrder.cart },
    }).then((response) => {
      console.log(response);
    });


    axios({
        method: "POST",
        url: `http://localhost:5005/notification/orderConfirmation`,
        data: {...newOrder, email: user.email, name: user.firstName},
    }).then(response => {
        console.log(response)
    });
  })
)

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})