if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const Inventory = require("./models/inventory.js");
const Product = require("./models/product");
const cors = require("cors")
const dbUrl = process.env.DB_URL;

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
  
  res.json(inventory);
});

app.get("/products", async (req, res) => {
  const {page, category} = req.query;
  
  const limit = 10
  const skip = (page - 1) * limit;

  if(category) {
    const product = await Product.find({category}).limit(limit);
    res.json(product);
  }
  const product = await Product.find().skip(skip).limit(limit);

  
  res.json(product);
});

app.get("/products/:productId", async (req, res) => {
  const {productId} = req.params;

  const product = await Product.findById(productId);

  res.json(product);
});

app.listen(7000, () => {
  console.log("Connected and listening on port 7000");
});
