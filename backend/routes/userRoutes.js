const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/auth");

router.post("/register", userController.register);
router.post("/recaptcha", userController.recaptcha);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.get("/user-data", authMiddleware, userController.getUserData);
router.get("/getuser/:username", userController.getUserByName);
router.put("/updateuser", authMiddleware, userController.updateUser);
module.exports = router;
