const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define Product Schema
const ProductSchema = new Schema({
  name: String,
  category: {
    type: String,
    enum: [
      "skin care",
      "hair care",
      "dental care",
      "facial care",
      "nail care",
      "fragrance",
    ],
  },
  brandName: String,
  description: String,
  price: Number,
  type: {
    type: String,
    enum: [
      "serum",
      "cream",
      "lotion",
      "liquid",
      "scrub",
      "wash",
      "soap",
      "perfume",
      "powder",
      "tool",
    ],
  },
});

module.exports = mongoose.model("Product", ProductSchema);