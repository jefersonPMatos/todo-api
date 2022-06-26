const express = require("express");
const router = express.Router();
const uploadAvatar = require("../middlewares/uploadAvatar");
const usersController = require("../controllers/usersController");
const userAuth = require("../middlewares/userAuth");
const userValidator = require("../middlewares/userValidator");

router.post(
  "/cadastrar",
  uploadAvatar,
  userValidator,
  usersController.registerUser
);
router.post("/login", usersController.login);
router.post("/:id", userAuth, usersController.update);
router.delete("/:id", userAuth, usersController.delete);
router.get("/recovery", userAuth, usersController.recovery);

module.exports = router;
