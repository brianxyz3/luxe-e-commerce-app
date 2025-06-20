const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  cart: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
  ],
  status: {
    type: String,
    enum: ["pending", "cancelled", "completed"],
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  shippindAddress: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    default: ["pay on delivery"],
  },
  createdAt: {
    type: String,
    default: Date.now.toString()
    }
});

module.exports = mongoose.model("Order", OrderSchema);