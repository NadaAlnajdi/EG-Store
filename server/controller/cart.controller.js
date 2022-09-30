const cartModel = require("../database/models/cart.model");
class Cart {
  static addCartItem = async (req, res) => {
    try {
      let itemalreadyInCart = await cartModel.findOne({
        product: req.params.productId,
        user: req.user._id,
      });
      if (itemalreadyInCart) {
        await cartModel.findOneAndUpdate(
          {
            product: req.params.productId,
            user: req.user._id,
          },
          { $set: req.body }
        );
        res.status(200).send({
          apiStatus: "true",
          message: "product already in cart successfully",
        });
      } else {
        const cartItem = await cartModel.create({
          ...req.body,
          user: req.user._id,
          product: req.params.productId,
        });
        res.status(200).send({
          apiStatus: "true",
          data: cartItem,
          message: "product added to cart successfully",
        });
      }
    } catch (e) {
      res.status(500).send({
        apiStatus: "false",
        data: e,
        message: "error",
      });
    }
  };
  static removeCartItem = async (req, res) => {
    try {
      await cartModel.deleteOne({
        _id: req.params.cartItemId,
        user: req.user._id,
      });
      res.status(200).send({
        apiStatus: "true",
        message: "product removed from cart successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: "false",
        data: e,
        message: "error",
      });
    }
  };
  static myCart = async (req, res) => {
    try {
      const myCart = await cartModel
        .find({ user: req.user._id })
        .populate("product")
        .populate("user");
      res.status(200).send({
        apiStatus: "true",
        data: myCart,
        message: " cart shown successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: "false",
        data: e,
        message: "error",
      });
    }
  };
  static editCart = async (req, res) => {
    try {
      let cartItem = await cartModel.updateOne(
        { _id: req.params.cartItemId, user: req.user._id },
        { $set: req.body }
      );
      if (!cartItem) throw new Error("not found");
      res.status(200).send({
        apiStatus: "true",
        data: cartItem,
        message: " cart edited successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: "false",
        data: e,
        message: "error",
      });
    }
  };
  static clearCart = async (req, res) => {
    try {
      await cartModel.deleteMany({ userId: req.user._id });
      res.status(200).send({
        apiStatus: "true",
        message: "cart cleared successfully",
      });
    } catch (e) {
      res.status(500).send({
        apiStatus: "false",
        data: e,
        message: "error",
      });
    }
  };
}
module.exports = Cart;
