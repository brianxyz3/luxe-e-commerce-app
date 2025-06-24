const mongoose = require("mongoose");
const Schema = mongoose.Schema

// Define Inventory Schema
const InventorySchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product"
  },
  units: Number,
  unitsSold: Number
});

module.exports = mongoose.model("Inventory", InventorySchema);