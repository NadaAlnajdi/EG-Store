const productModel = require("../database/models/product.model");
class Product {
  static getAllProducts = async (req, res) => {
    try {
      const users = await productModel.find();
      res.status(200).send({
        apiStatus: true,
        data: users,
        message: "all data fetched",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: false,
        data: err,
        message: err.message,
      });
    }
  };

  static addProduct = async (req, res) => {
    try {
      const product = await productModel.create(req.body);

      res.status(200).send({
        apiStatus: "true",
        data: product,
        message: "product added successfully",
      });
    } catch (err) {
      console.log(err)
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "product error",
      });
    }
  };

  static singleProduct = async (req, res) => {
    try {
      const product = await productModel.findById(req.params.productId);
      if (!product) throw new Error("product not found");
      res.status(200).send({
        apiStatus: "true",
        data: product,
        message: "product shown successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "product error",
      });
    }
  };

  static editProduct = async (req, res) => {
    try {
      const product = await productModel.findByIdAndUpdate(
        req.params.productId,
        req.body
      );
      console.log(product);
      res.status(200).send({
        apiStatus: "true",
        data: product,
        message: "product edited successfully",
      });
    } catch (err) {
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "product error",
      });
    }
  };

  static delProduct = async (req, res) => {
    try {
      let product = await productModel.findById(req.params.productId);
      if (!product) throw new Error("product not found");
      await productModel.findByIdAndDelete(req.params.productId);
      res.status(200).send({
        apiStatus: "true",
        message: "product deleted",
      });
    } catch (err) {
      console.log(err);
      res.status(500).send({
        apiStatus: "false",
        data: err,
        message: "product error",
      });
    }
  };

  static uploadImage = async (req, res) => {
    
    try {
      if (req.file) {
        await productModel.findByIdAndUpdate(req.params.productId, {
          $set: {
            mainImage: "uploads/" + req.user._id + "/" + req.file.filename,
          },
        });
      } else {
        await productModel.findByIdAndUpdate(req.params.productId, {
          $set: {
            mainImage: "uploads/" + "product.png",
          },
        });
      }
      res.status(200).send({
        apiStatus: "true",
        data: "uploads/" + req.user._id + "/" + req.file.filename,
        message: "image uploaded",
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        apiStatus: "false",
        data: e,
        message: "product error",
      });
    }
  };
}

module.exports = Product;
