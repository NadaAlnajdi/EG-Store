const productController = require("../controller/product.controller");
const router = require("express").Router();
const auth = require("../middlewares/auth");
const upload = require("../middlewares/fileUpload");
router.get("/getAllProducts", productController.getAllProducts);
router.get("/singleProduct/:productId", productController.singleProduct);

router.post("/addProduct", productController.addProduct);
router.patch("/editProduct/:productId", productController.editProduct);
router.patch(
  "/uploadImage/:productId",
  [auth("Admin"), upload.single("img")],
  productController.uploadImage
);

router.delete("/delProduct/:productId", productController.delProduct);

module.exports = router;
