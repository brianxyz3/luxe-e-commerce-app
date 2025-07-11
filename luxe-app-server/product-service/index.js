if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
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

const pageLimit = 10;

app.get("/products", async (req, res) => {
  const {page} = req.query;
  
  const skip = (page - 1) * pageLimit;
  
  const product = await Product.find().skip(skip).limit(pageLimit);

  res.json(product);
});

app.get("/products/search", async (req, res) => {
  const {page, category= "all", type= "all"} = req.query;

  const skip = (page - 1) * pageLimit;

  const product = await Product.find({ category: { $in : [category] }, type: { $in: [type] } }).skip(skip).limit(pageLimit).catch((err) => console.log(err));

  return res.json(product);

});

app.get("/products/:productId", async (req, res) => {
  const {productId} = req.params;
    console.log(productId);
    
  const product = await Product.findById(productId);

  res.json(product);
});

app.listen(port, () => {
  console.log("Connected and listening on port " + port);
});
  