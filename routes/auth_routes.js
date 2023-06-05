const express = require("express");
const router = express.Router();
const {
    signup,
    login,
    logout,
    verifyToken,
    verifyOtpByMobile,
} = require("../controllers/auth_controller.js");

router.route("/signup").post(signup);
router.route("/mobile-otp-verification").post(verifyOtpByMobile);

router.route("/login").post(login);
router.route("/logout").post(verifyToken, logout);
module.exports = router;