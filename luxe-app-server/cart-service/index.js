if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const mongoose = require("mongoose");
const dbUrl = process.env.DB_URL;

const express = require("express");
const cors = require("cors");
const catchAsync = require("../shared/utlis/catchAsync.js");
const User = require("../shared/database/models/user.js");

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

app.put(
  "/:userId/shoppingCart/update",
  catchAsync(async (req, res) => {
    const { userId } = req.params;
    
    const item = req.body;    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    if (user.cart.length > 0 && user.cart.some(product => product.productId == item.productId)) {
      const newCart = user.cart.map((product) => {
        if (product.productId == item.productId) {
          if (item.units < 1) {
            product.units += 1;
            return product;
          } else if(item.units >= 1) {
            product.units = item.units;
            return product;
          }
        } else {
          return product;
        }
      });
      user.cart = newCart;      
      await user.save();
      return res.status(200).json({ cart: user.cart, message: "Added To Cart" });
    }

    user.cart.push({...item, units: 1});
    
    await user.save();

    res.status(200).json({ cart: user.cart, message: "Added To Cart" });
  })
);

app.put(
  "/:userId/shoppingCart/delete",
  catchAsync(async (req, res) => {
    const { userId } = req.params;
    const { itemId } = req.query;
    
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const updatedCart = user.cart.filter(product => product.productId != itemId)
    
    user.cart = updatedCart;

    await user.save();

    res.status(200).json({ cart: user.cart, message: "Removed From Cart" });
  })
);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
