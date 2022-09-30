const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
    },
  },
  { timestamps: true }
);
cartSchema.methods.toJSON = function () {
  const cart = this.toObject();
  const { __v, ...others } = cart;
  return others;
};

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
