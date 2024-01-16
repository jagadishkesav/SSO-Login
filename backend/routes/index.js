const express = require("express");
const router = express.Router();
const configurePassport = require("../utils/passport");
const authController = require("../controllers/authController");

configurePassport();

router.get("/login", authController.login);
router.get("/auth/google", authController.authGoogle);
router.get("/google/callback", authController.googleCallback);
router.get("/user", authController.getUser);
router.get("/auth", authController.getAuth);
router.get("/logout", authController.logout);

module.exports = router;
