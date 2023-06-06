const express = require('express');
const router =express.Router();
const{ getAllUser,getUserById} = require("../controllers/admin_controller");
const {verifyToken}  =require('../controllers/auth_controller');

// console.log("inside user routes");

router.route("/").get(verifyToken,getAllUser);
router.route("/:id").get(verifyToken,getUserById);

module.exports = router;
