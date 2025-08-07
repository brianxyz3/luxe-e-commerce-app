if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const Inventory = require("./models/inventory.js");
const Product = require("./models/product.js");
const cors = require("cors");
const catchAsync = require("../shared/utlis/catchAsync.js");
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/luxe";
const port = process.env.PORT || 3003;

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
  const inventory = await Inventory.find().populate("product");
  inventory.sort((a, b) => a.product.units - b.product.units);
  const totalStock = inventory.reduce((total, currInventory) => {
    if (!currInventory.product.units) return total;
    return total + currInventory.product.units;
  }, 0);
  const totalSale = inventory.reduce((total, currInventory) => {
    return total + ( currInventory.unitsSold * Math.floor(currInventory.product.price) );
  }, 0);
  res.status(200).json({ inventory, totalStock, totalSale });
});

app.get("/inventory/:inventoryId", async (req, res) => {
  const {inventoryId} = req.params;

  const inventory = await Inventory.findById(inventoryId).populate("product");
  
  res.status(200).json({inventory});
});


app.put("/inventory/confirmedOrder/update",
  catchAsync(async (req, res) => {
    try{
      const {cart} = req.body;

      for (const product of cart) {
        const productInInventory = await Inventory.find({product: product.productId})
        .catch(err => console.log(err))          
        if(productInInventory.length) {
          productInInventory[0].product.units -= product.units;
          productInInventory[0].unitsSold += product.units;
        }
      }

      res.status(200).json();
      
    }catch{ err => {
      console.log(err)
    }
    }
  })
)

app.put("/inventory/:inventoryId/edit", catchAsync( async (req, res) => {
  const {inventoryId} = req.params;
  await Inventory.findByIdAndUpdate(inventoryId, req.body).catch((err) => console.log(err));
  await Product.findByIdAndUpdate(req.body.product._id, req.body.product).catch((err) => console.log(err));
  res.status(200).json({ message: "Product Inventory successfully updated" });
}))

app.put(
  "/inventory/:productId/reStockInventory",
  catchAsync(async (req, res) => {
    const { productId } = req.params;
    await Product.findByIdAndUpdate(productId, req.body).catch((err) =>
      console.log(err)
    );
    res
      .status(200)
      .json({ message: "Product Inventory successfully re-stocked" });
  })
);

app.delete("/inventory/:inventoryId/delete", catchAsync( async (req, res) => {
  const {inventoryId} = req.params;
  const deletedInventoryItem = await Inventory.findByIdAndDelete(inventoryId).catch((err) => console.log(err));
  if(!deletedInventoryItem) return res
    .status(404)
    .json({ message: "Product does not exist in inventory" });
  const product = await Product.findByIdAndUpdate(deletedInventoryItem, {
    units: -10,
  }).catch((err) => console.log(err)); // negative product units means product has was deleted from inventory
  res.status(200).json({ message: "Product inventory successfully deleted" });
}))

app.listen(port, () => {
  console.log("Connected and listening on port " + port );
});
