const express = require("express");
const registerController = require("../controllers/auth.controller.js");
const loginController = require("../controllers/auth.controller.js");
const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
