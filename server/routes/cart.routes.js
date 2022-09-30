const router = require("express").Router();
const auth = require("../middlewares/auth");
const cartController = require("../controller/cart.controller");

router.post(
  "/addCartItem/:productId",
  auth("User"),
  cartController.addCartItem
);
router.delete(
  "/removeCartItem/:cartItemId",
  auth("User"),
  cartController.removeCartItem
);
router.get("/myCart", auth("User"), cartController.myCart);
router.patch("/editCart/:cartItemId", auth("User"), cartController.editCart);
router.delete("/clearCart", auth("User"), cartController.clearCart);
module.exports = router;
