if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const Inventory = require("./models/inventory.js");
const Product = require("./models/product");
const cors = require("cors");
const catchAsync = require("../shared/utlis/catchAsync.js");
const dbUrl = process.env.DB_URL;
const port = process.env.PORT;

mongoose.connect(dbUrl);

const db = mongoose.connection;

  db.on("error", console.error.bind(console, "Connection error:"));
  db.once("open", () => {
    console.log("Database Connected");
  });

const app = express();

app.use(cors())
app.use(express.json())

app.get("/inventory", async (req, res) => {
  const inventory = await Inventory.find();
  
  res.json({inventory});
});

app.get("/products", async (req, res) => {
  const {page, category} = req.query;
  
  const limit = 10
  const skip = (page - 1) * limit;

  if(category) {
    const product = await Product.find({category}).limit(limit);
    return res.json(product);
  }
  const product = await Product.find().skip(skip).limit(limit);

  
  res.json(product);
});

app.get("/products/:productId", async (req, res) => {
  const {productId} = req.params;

  const product = await Product.findById(productId);

  res.json(product);
});

app.put("/inventory/confirmedOrder/update",
  catchAsync(async (req, res) => {
    try{
      const {cart} = req.body;

      for (const product of cart) {
        (async function updateInventory () {
          const productInInventory = await Inventory.find({product: product.productId})
          .catch(err => console.log(err))          
          productInInventory[0].units -= product.units;
          productInInventory[0].unitsSold += product.units;
          console.log(productInInventory);
        })()
      }

      res.status(200).json();
      
    }catch{ err => {
      console.log(err)
    }
    }
  })
)

app.listen(port, () => {
  console.log("Connected and listening on port " + port );
});
