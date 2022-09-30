const router = require("express").Router();
const userController = require("../controller/user.controller");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/fileUpload");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/registerAdmin", userController.registerAdmin);

router.get("/showAllUsers", auth("Admin"), userController.showAllUsers);

router.post("/logout", auth("Both"), userController.logout);
router.patch(
  "/changeImage",
  auth("Both"),
  upload.single("img"),
  userController.changeImage
);

router.get("/showProfile", auth("Both"), userController.profileShow);
router.get("/showProfile/:id", userController.profileShow2);
router.patch("/editProfile", auth("Both"), userController.profileEdit);
router.patch("/editPassword", auth("Both"), userController.passwordEdit);
router.delete("/deleteProfile", auth("Both"), userController.profileDelete);
router.delete("/deleteProfile/:id", userController.profileDelete2);

module.exports = router;
