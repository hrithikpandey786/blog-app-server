const express = require("express");
const router = express.Router();
const controllers = require("../controllers/auth.controller.js");


router.post("/register", controllers.register);
router.post("/login", controllers.login);
router.post("/logout", controllers.logout);
router.put("/update/:id", controllers.updateProfile);


module.exports = router;