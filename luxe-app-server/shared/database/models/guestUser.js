const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GuestUserSchema = new Schema({
  guestId: String,
  cart: [{
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
    productName: {
      type: String,
    },
    productBrandName: {
      type: String,
    },
    productImg: String,
    price: {
      type: Number,
    },
    units: {
      type: Number,
    },
  }],
});

module.exports = mongoose.model("GuestUser", GuestUserSchema);