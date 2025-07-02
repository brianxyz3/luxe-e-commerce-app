if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const catchAsync = require("../shared/utlis/catchAsync.js");
const User = require("../shared/database/models/user.js");
const GuestUser = require("./models/guestUser.js");
const {v4: uuidv4} = require("uuid");

const PORT = process.env.PORT;
const app = express();

mongoose.connect(dbUrl);

const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => {
    console.log("Database Connected");
  });

app.use(express.json());
app.use(cors());

const updateCart = (user, item) => {
  if (
    user.cart.length > 0 &&
    user.cart.some((product) => product.productId == item.productId)
  ) {
      const newCart = user.cart.map((product) => {
        if (product.productId == item.productId) {
          if (item.units < 1) {
            product.units += 1;
            return product;
          } else if (item.units >= 1) {
            product.units = item.units;
            return product;
          }
        } else {
          return product;
        }
      });

      user.cart = newCart;
      return user;
    }

    user.cart.push({ ...item, units: 1 });
    return user;
}

app.put(
  "/shoppingCart/:userId/update",
  catchAsync(async (req, res) => {
    const { userId } = req.params;

    const item = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const updatedUser = updateCart(user, item)

    await updatedUser.save();

    res.status(200).json({ cart: updatedUser.cart, message: "Added To Cart" });
  })
);

app.put("/shoppingCart/guest/:guestId/update", catchAsync(async (req, res) => {
  const { guestId } = req.params;
  console.log(guestId);
  
  const item = req.body;
  if(guestId === "null") {
    const newGuest = new GuestUser({ guestId: `guest_${uuidv4()}`, cart: [{...item, units: 1}] });
    
    const guest = await newGuest.save().catch((err) => console.log(err));
    
    return res.status(200).json({ id: guest._id, cart: guest.cart, message: "Added To Cart" });

  }
  const guest = await GuestUser.findById(guestId);
  const updatedGuest = updateCart(guest, item);

  await updatedGuest.save();

  res.status(200).json({ cart: updatedGuest.cart, message: "Added To Cart" });
}));

app.put(
  "/shoppingCart/:userId/delete",
  catchAsync(async (req, res) => {
    const { userId } = req.params;
    const { itemId } = req.query;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const updatedCart = user.cart.filter(
      (product) => product.productId != itemId
    );

    user.cart = updatedCart;

    await user.save();

    res.status(200).json({ cart: user.cart, message: "Removed From Cart" });
  })
);

app.put(
  "/shoppingCart/guest/:guestId/delete",
  catchAsync(async (req, res) => {
    const { guestId } = req.params;
    const { itemId } = req.query;

    const guest = await GuestUser.findById(guestId);
    if (!guest) return res.status(404).json({ message: "Guest Cart Not Found" });
    const updatedCart = guest.cart.filter(
      (product) => product.productId != itemId
    );

    guest.cart = updatedCart;

    await guest.save();

    res.status(200).json({ cart: guest.cart, message: "Removed From Cart" });
  })
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
