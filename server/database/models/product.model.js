const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
    },

    category: {
      type: String,
    },

    mainImage: {
      type: String,
      trim: true,
      default: "uploads/product.png",
    },
  },
  { timestamps: true }
);

productSchema.methods.toJSON = function () {
  const product = this.toObject();
  const { __v, ...others } = product;
  return others;
};

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
