const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/auth/authController");
const {
  forgotPassword,
  resetPassword,
} = require("../controllers/auth/passwordController");

// Ensure that the controller methods are correctly assigned to the routes
router.post("/signup", signup); // signup method from authController
router.post("/login", login); // login method from authController
router.post("/forgot-password", forgotPassword); // forgotPassword from passwordController
router.post("/reset-password/:token", resetPassword); // resetPassword from passwordController

module.exports = router;
